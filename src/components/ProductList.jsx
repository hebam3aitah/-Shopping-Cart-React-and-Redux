import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../redux/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.cart);

  // ✅ جلب البيانات عند تشغيل المكون
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p className="text-center text-xl">🕐 جاري تحميل المنتجات...</p>;
  if (status === "failed") return <p className="text-center text-red-500 text-lg">❌ حدث خطأ: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🛍️ قائمة المنتجات</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {/* ✅ التأكد من عرض الصورة بحجم مناسب */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600 text-md mt-1">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-3 w-full rounded hover:bg-blue-600 transition"
              onClick={() => dispatch(addToCart(product))}
            >
              🛒 إضافة إلى السلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
