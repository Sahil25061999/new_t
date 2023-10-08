"use client";
import {HomeCard, Welcome} from "@/components/index.component";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { product } from "@/shared/schemes/product";
export default function Home() {
  const router = useRouter();
  const [images, setImgSrc] = useState<Array<null | product>>([]);
  const [column, setColumn] = useState(4);
  const [width, setWidth] = useState(0);
  const handleLogout = async () => {
    try {
      const res = await axios("/api/users/logout");
      if (res && res?.data.success) {
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    let resizeFunc = (e: any) => {
      setTimeout(() => {
        setWidth(Math.floor(window.screen.width));
      }, 2000);
    };

    window.addEventListener("resize", resizeFunc);
    return () => window.removeEventListener("resize", resizeFunc);
  }, []);

  useEffect(() => {
    for (let i = 2; i < Math.floor(width / i) && i < 10; i++) {
      if (Math.floor(width % i) === 0) {
        if (width > 500) {
          if (i === 2) continue;
        }
        setColumn(i);
      }
    }
  }, [width]);

  useEffect(() => {
    (async () => {
      try {
        const res: any = await axios(
          `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_CLIENT_ID};per_page=20`
        );
        setImgSrc(() => res.data);
      } catch (e) {}
    })();
  }, []);

  return (
    <main className="home__section min-h-screen relative">
      <Welcome />
      <header className="hero__section h-screen relative z-10">
        {/* <button onClick={handleLogout}>Logout</button> */}
        <div className="product__section " style={{ columns: column }}>
          {images.map((items, index) => (
            items?.urls ? <HomeCard urls={items?.urls}/> : <></>
          ))}
        </div>
      </header>
    </main>
  );
}
