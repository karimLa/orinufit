import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Dot = styled.div`
  background-color: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    background-color: pink;
    transform: scale(4) rotateX(0.5turn);
  }
`;

type Props = {
  count: number;
};

function CartCount({ count }: Props) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          key={count}
          className='count'
          classNames='count'
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}

export default CartCount;
