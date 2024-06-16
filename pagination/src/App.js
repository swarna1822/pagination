import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage]= useState(1)
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleSelectedPage = (selectedPage) =>{
    if(selectedPage>=1 && selectedPage <= products.length/10 && selectedPage  !== page ){
      setPage(selectedPage)
    }
  }
  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page*10-10, page*10).map((prod) => {
            return (
              <span className="products__single" key={prod.id} >
                <img src={prod.thumbnail} alt={prod.title} />
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && <div className="pagination">
        <span className={page>1? '':'pagination__disable'} onClick={()=>handleSelectedPage(page-1)}>⬅️</span>
        {[...Array(products.length/10)].map((_,i)=>{
          return  <span key={i} className={page === i+1 ? 'pagination__selected' : ''} onClick={()=>handleSelectedPage(i+1)}>{i+1}</span>
          
         
        })}
        <span className={page<products.length/10 ? 'pagination__disable':''} onClick={()=>handleSelectedPage(page+1)} >➡️</span>
        </div>}
    </>
  );
}

export default App;
