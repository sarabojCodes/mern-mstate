import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "./Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact,setContact] = useState(false)
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const getdata = await fetch(`/api/listing/get/${listingId}`);
        const data = await getdata.json();
        console.log(data);
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, []);
  return (
    <main>
      {loading && <p className="text-center text-2xl">Loading...</p>}
      {error && <p className="text-center text-2xl">Something went wrong...</p>}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-4 p-3">
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-4">
                <span className="text-4xl">
                  {listing.name ? listing.name : ""}
                </span>
                <span className="bg-red-700 p-2 rounded-lg text-white">
                  For {listing.type}
                </span>
              </p>
              <p className="text-green-600 text-xl italic">
                Rs.{listing.regularPrice}/-
              </p>
              <p className="text-lg text-gray-700">{listing.description}</p>
              {currentUser && listing.userRef !== currentUser._id && (
                <button onClick={()=>setContact(true)} className="p-4 bg-red-600 w-40 mx-auto rounded-md text-white hover:bg-red-500">Contact landlord</button>
              )}

              {
                contact && <Contact listing={listing}/>
              }
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
