import React, { memo } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import './styles.css';
import styled from 'styled-components';
import CategorizedVideoItem from 'components/CategorizedVideoItem';
import { ChevronLeft } from '@material-ui/icons';

const SliderWrapper = styled.div`
  width: 95%;
  margin: auto;
  border-bottom: 1px solid rgb(245, 245, 249);
  padding-bottom: 1.5rem;
  .keen-slider {
    direction: ltr;
  }
`;
function SlidableVideoList({ categoryVideos, redirectToCategory }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    spacing: 10,
    slidesPerView: 2,
    centered: true,
    loop: true,
    mode: 'snap',
    breakpoints: {
      '(min-width: 476px)': {
        slidesPerView: 3,
        mode: 'free-snap',
      },
      '(min-width: 768px)': {
        slidesPerView: 6,
        mode: 'free-snap',
      },
      '(min-width: 1200px)': {
        slidesPerView: 8,
        mode: 'free-snap',
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <SliderWrapper>
      <div className="categoryTitle">
        <h3>{categoryVideos.title}</h3>
        <span onClick={() => redirectToCategory(categoryVideos.id)}>
          مشاهده همه
          <ChevronLeft />
        </span>
      </div>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {categoryVideos &&
            categoryVideos.videos &&
            categoryVideos.videos.map(item => (
              <CategorizedVideoItem key={item.id} video={item} />
            ))}
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={e => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />

            <ArrowRight
              onClick={e => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </div>
    </SliderWrapper>
  );
}

function ArrowLeft(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <span className={`arrow arrow--left ${disabeld}`} onClick={props.onClick}>
      <svg
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    </span>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <span className={`arrow arrow--right ${disabeld}`} onClick={props.onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
    </span>
  );
}

export default memo(SlidableVideoList);
