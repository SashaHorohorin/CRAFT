import React, { Children, cloneElement, useEffect, useState } from 'react'
import './Carousel.scss'

const PAGE_WIDTH = 300
const SHOW_BLOCK = 3

const Carousel = ({children}) => {

    const [pages, setPages] = useState([]);
    const [offset, setOffset] = useState(0);
    const [marginRight, setMarginRight] = useState(30);
    const [width, setWidth] = useState(1100);
    const [maxOffset, setMaxOffset] = useState(0)

    const heandleLeftArrowClick = () => {
        console.log('left');
        setOffset((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH + marginRight;
            console.log(newOffset);
            return Math.min(newOffset, 0)
        })
    }
    useEffect(() => {
        setPages(
            Children.map(children, (child) => {
                return cloneElement(child)
            })
        )
    }, [])
    useEffect(() => {
        setTimeout(()=> {
            const item =  document.querySelector('.item');
            const windowItems =  document.querySelector('.window');
            // console.log(parseInt(window.getComputedStyle(item).getPropertyValue("margin-right")));
            // setMarginRight(parseInt(window.getComputedStyle(item).getPropertyValue("margin-right")))
            // setWidth(parseInt(window.getComputedStyle(windowItems).getPropertyValue("width")))
            setMaxOffset(-((PAGE_WIDTH + marginRight) * pages.length - ((PAGE_WIDTH + marginRight) * (PAGE_WIDTH - SHOW_BLOCK)) - (width - ((PAGE_WIDTH + marginRight) * (PAGE_WIDTH - SHOW_BLOCK))) - marginRight));
            // console.log(-(PAGE_WIDTH * SHOW_BLOCK - marginRight - 20) + ' , ' + (-((PAGE_WIDTH + marginRight) * pages.length - ((PAGE_WIDTH + marginRight) * (PAGE_WIDTH - SHOW_BLOCK)) - (width - ((PAGE_WIDTH + marginRight) * (PAGE_WIDTH - SHOW_BLOCK))) - marginRight)));
        }, 10)
    }, [pages])
    const heandleRightArrowClick = function () {
        console.log('right');
        
        // maxOffset = -(PAGE_WIDTH * SHOW_BLOCK - marginRight);
        console.log(maxOffset);
        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH - marginRight;

            console.log(newOffset, maxOffset);
            return Math.max(newOffset, maxOffset)
        })
        console.log(offset);
    }

    

  return (
    <div className='main-container'>
        <div className="arrow-left" onClick={heandleLeftArrowClick}>
            <img src="./images/HomePage/Carousel/row.svg" alt="" />
        </div>
        <div className="window">
            <div className="all-pages-container"
            style={{
                transform: `translateX(${offset}px)`
            }}
            >{pages}</div>
        </div>
        <div className="arrow-right" onClick={heandleRightArrowClick}>
            <img src="./images/HomePage/Carousel/row.svg" alt="" />
        </div>
        {offset === maxOffset ? null : <div className="shadow"></div>}
    </div>
  )
}

export default Carousel