import React, { useEffect, useState } from 'react';


const imageUrls = [
    "https://res.akamaized.net/domain/image/fetch/t_web/https://static.domain.com.au/twr/production/uploads/content-watched/818292_Large.jpg" ,
    'https://domf5oio6qrcr.cloudfront.net/medialibrary/11956/ba1bd78f-468b-465a-9d3b-36454148fe45.jpg',
    'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/04/pjimage-2022-04-26t124613-1650957376.jpg',
    'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1maW5kZXIifSwicGF0aCI6ImloaC1oZWFsdGhjYXJlLWJlcmhhZFwvYWNjb3VudHNcL2MzXC80MDAwNjI0XC9wcm9qZWN0c1wvMjA5XC9hc3NldHNcLzAyXC8zNzA1NVwvZDA4YTcwN2MwNTFjZmRjYTBiYWMxOThlNzg2NTRhOWItMTY1ODI5ODk1Ny5qcGcifQ:ihh-healthcare-berhad:B6xndBJKifxJGe4wpLiXGkeMSAIA_12_ErNRx8Sd_O4?format=webp',
    'https://hips.hearstapps.com/hmg-prod/images/what-are-figs-64790d2213b14.jpg',
    'https://www.100daysofrealfood.com/wp-content/uploads/2023/09/shutterstock_23429146.jpg',
    'https://www.savoringthegood.com/wp-content/uploads/2023/07/lime.jpg'
];

const SlideShow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 3000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <section className="image-container">
            <div className="container">
                <div className="slide_image">
                    {imageUrls.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className={`image ${index === currentImageIndex ? 'visible' : ''}`}
                        />
                    ))}
            </div>
            </div>
        </section>
    );
};

export default SlideShow;
