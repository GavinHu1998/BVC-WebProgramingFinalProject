import { useState, useEffect } from "react";
import { Book } from "./Book";

export function Books() {
    const [books, setBooks] = useState([]); // 用于存储从 API 获取的书籍数据
    const [loading, setLoading] = useState(true); // 用于显示加载状态
    const [error, setError] = useState(null); // 用于存储错误信息

    
    

    useEffect(() => {
        // 使用 fetch 获取书籍数据
        fetch("http://localhost:7000/books")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setBooks(data); // 设置书籍数据
                setLoading(false); // 关闭加载状态
            })
            .catch((err) => {
                setError(err.message); // 记录错误信息
                setLoading(false); // 关闭加载状态
            });
    }, []); // 仅在组件首次渲染时运行

    // 显示加载状态或错误信息
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full flex justify-center">
            <div className="
                max-w-[1440px] 
                grid 
                sm:grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-3 
                gap-4 mt-4 mx-5">
                {books.map((book) => (
                    // 遍历书籍数组并渲染 Book 组件
                    <Book 
                        id={book.id} 
                        title={book.title} 
                        author={book.author} 
                        description={book.description} 
                        publicationDate={book.publicationDate} 
                        coverImage={book.coverImage} 
                    />
                ))}
            </div>
        </div>
    );
}
