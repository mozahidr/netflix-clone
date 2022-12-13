import React, { useState, useEffect } from 'react';
import './PlanScreen.css';
import { db } from '../firebase';
import { collection, query, where, addDoc, getDocs, getDoc, onSnapshot, doc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";
import { async } from '@firebase/util';

export const PlanScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    // Subscribe

    useEffect(() => {
      const fetchSubscription = async () => {
        const q = collection(db, "customers", user.uid, "subscriptions");
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          //setSubscription(doc.data());
          setSubscription({
            role: doc.data().role,
            current_period_end: doc.data().current_period_end.seconds,
            current_period_start: doc.data().current_period_start.seconds,
          });
        })
        
      }
      fetchSubscription();
    }, [user.uid]);

     useEffect(() => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const unsub = onSnapshot(q, async (querySnapshot) => {
        const products = {};
        for (const productDoc of querySnapshot.docs) {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
          
          for (const price of priceSnap.docs) {
            products[productDoc.id].price = {
              priceId: price.id,
              priceData: price.data(),
            };
          }
        }
        setProducts(products);
      });
      //return () => unsub();

     }, []);
     console.log({ products });
     console.log({ subscription });

     const loadCheckout = async (priceId) => {

      const docRef = await addDoc(collection(db, "customers", `${user.uid}`, "checkout_sessions"), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })
      // onSnapshot(doc(db, "customers", `${user.uid}`, "checkout_sessions", docRef.id), async (snap) => {
      
      onSnapshot(doc(db, "customers", `${user.uid}`, "checkout_sessions", docRef.id), async (snap) => {
          const { error, sessionId } = snap.data();
          
          if (error) {
            // Show an error to your customers and
            // inspect your cloud funciton  logs in The Firebase console.
            alert(`An error occurred: ${error.message}`);
          }

            if(sessionId) { 
              // We have a session, let's redirect to Checkout
              // Init Stripe
              const stripe = await loadStripe("pk_test_51MCfNICDI6SXLiMtHNS9xhcQh3LYv79kktGQgD60LU0FuzPZj59nZpU6Lsw8ZdTwJqeDK6Ugl4RZNwXANFyw1BA700fYklkf7L");
              stripe.redirectToCheckout({ sessionId });
            }
          
        })
     };
    
  return (
    <div className='plansScreen'>
      <br/>
      {subscription && (
        <p>
          Renewal date: {" "}
          {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add some logic to check if the user's subscription is active...

        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        return (
          <div key={productId} className={`${isCurrentPackage && "planScreen__plan__disabled"} plansScreen__plan`}>
            <div className='plansScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.price.priceId)}>
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        )
      })}
    </div>
  )
}
