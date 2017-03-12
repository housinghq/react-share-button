import React from 'react';
const { describe, it } = global;
import { shallow, mount } from 'enzyme';
import { expect } from 'chai'
import sinon from 'sinon'
import Swipe from '../components';
import LazyCard from 'react-lazy-card/dist'

function simulateDrag(drag){
    const onSwipe = sinon.spy()

    const wrapper = mount(
      <Swipe
        onSwipe={onSwipe}
      >
        <LazyCard image={'a.jpg'} defaultImage={'c.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    wrapper.setState({width: 100})

    wrapper.find('.rs-imgs-wrapper').simulate('touchstart', {
      touches: [{
        clientX: 0
      }]
    })

    wrapper.setState({drag})

    wrapper.find('.rs-imgs-wrapper').simulate('touchend')

  return {wrapper, onSwipe}
}

describe('Swipe Component', () => {
  it('should add custom className to root element', () => {
    const wrapper = shallow(
      <Swipe className={'test'}>
        <LazyCard image={'a'} defaultImage={'b'}/>
      </Swipe>
    );

    expect(wrapper.find('.test')).to.have.length(1)
  })

  it('should use the same default image for all if defaultImages prop is string', () => {
    const wrapper = mount(
      <Swipe>
        <LazyCard image={'a.jpg'} defaultImage={'default.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'default.jpg'}/>
      </Swipe>
    )

    expect(wrapper.find(LazyCard)).to.have.length(2)

    expect(wrapper.find(LazyCard).get(0).state.image).to.equal('default.jpg')
    expect(wrapper.find(LazyCard).get(1).state.image).to.equal('default.jpg')
  })

  it('should use different default images if defaultImages prop is array', () => {
    const wrapper = mount(
      <Swipe>
        <LazyCard image={'a.jpg'} defaultImage={'c.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    expect(wrapper.find(LazyCard)).to.have.length(2)
    expect(wrapper.find(LazyCard).get(0).state.image).to.equal('c.jpg')
    expect(wrapper.find(LazyCard).get(1).state.image).to.equal('d.jpg')
  })

  it('should replace next and prev element if it is passed', () => {
    const wrapper = shallow(
      <Swipe
        next={<span>NEXT</span>}
        prev={<span>PREV</span>}
      >
        <LazyCard image={'a.jpg'} defaultImage={'c.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    expect(wrapper.find('.rs-next').find('span')).to.have.length(1)
  })

  it('should go to slide passed in gotoSlide(i)', () => {
    const onSwipe = sinon.spy()

    const wrapper = mount(
      <Swipe onSwipe={onSwipe}
      >
        <LazyCard image={'a.jpg'} defaultImage={'c.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    const comp = wrapper.instance()
    const spy = sinon.spy(comp, 'gotoSlide')

    comp.gotoSlide(1)

    const args = {
      currentIndex: 1,
      initialIndex: 0
    }

    expect(spy.calledOnce).to.equal(true)

    expect(wrapper.state('currentIndex')).to.equal(1)

    expect(onSwipe.calledOnce).to.equal(true)
    expect(onSwipe.calledWith(args)).to.equal(true)
  })

  it('should change slides at correct intervals if autoPlay is true', () => {
    const onSwipe = sinon.spy()
    const clock = sinon.useFakeTimers();

    const wrapper = mount(
      <Swipe
        onSwipe={onSwipe}
        autoPlay={true}
        autoPlayInterval={5000}
      >
        <LazyCard image={'a.jpg'} defaultImage={'c.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    clock.tick(4999)
    expect(wrapper.state('currentIndex')).to.equal(0)
    expect(onSwipe.calledOnce).to.equal(false)

    clock.tick(1)
    expect(wrapper.state('currentIndex')).to.equal(1)
    expect(onSwipe.calledOnce).to.equal(true)

    clock.tick(4999)
    expect(wrapper.state('currentIndex')).to.equal(1)
    expect(onSwipe.calledTwice).to.equal(false)

    clock.tick(1)
    expect(wrapper.state('currentIndex')).to.equal(2)
    expect(onSwipe.calledTwice).to.equal(true)

    clock.tick(5000)
    expect(wrapper.state('currentIndex')).to.equal(0)
    expect(onSwipe.calledThrice).to.equal(true)
    expect(onSwipe.calledWith({currentIndex:0, initialIndex:2})).to.equal(true)
  })

  it('should execute onClick on click', () => {
    const onSwipe = sinon.spy()
    const onClick = sinon.spy()

    const wrapper = mount(
      <Swipe
        onSwipe={onSwipe}
        onClick={onClick}
      >
        <LazyCard image={'a.jpg'} defaultImage={'c.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
        <LazyCard image={'b.jpg'} defaultImage={'d.jpg'}/>
      </Swipe>
    )

    const component = wrapper.instance()

    wrapper.find('.rs-imgs-wrapper').simulate('click')

    expect(onClick.calledOnce).to.equal(true)
    expect(onClick.calledWith({index: 0})).to.equal(true)

    component.gotoSlide(2)
    wrapper.find('.rs-imgs-wrapper').simulate('click')

    expect(onClick.calledTwice).to.equal(true)
    expect(onClick.calledWith({index: 2})).to.equal(true)
  })

  it('should not change to next slide when drag is less than threshold', () => {
    const {wrapper, onSwipe} = simulateDrag(49)

    expect(wrapper.state('drag')).to.equal(0)
    expect(wrapper.state('currentIndex')).to.equal(0)
    expect(onSwipe.calledOnce).to.equal(false)
  })

  it('should change to next slide when drag is more than threshold', () => {
    const {wrapper, onSwipe} = simulateDrag(51)
    expect(wrapper.state('drag')).to.equal(0)
    expect(wrapper.state('currentIndex')).to.equal(1)
    expect(onSwipe.calledOnce).to.equal(true)
    expect(onSwipe.calledWith({currentIndex: 1, initialIndex: 0})).to.equal(true)
  })
})