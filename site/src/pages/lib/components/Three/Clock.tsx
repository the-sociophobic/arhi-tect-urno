import { FC, useEffect, useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { Box, Sphere, useScroll } from '@react-three/drei'

import TextThree from './Text'
import useMousePointerOnHover from '../../hooks/useMousePointerOnHover'
import { CameraControls } from './CameraControls'
import architects from '../../../architects/list'


const CLOCK_RADIUS = 7.5
const TICK_LENGTH = 1.5
const TICK_LENGTH_ZOOMED = 1
const TICK_WIDTH = .05
const NUMBER_OF_SUBTICKS = 10
const SUBTICK_SCALE = .5
const CLOCK_ROTATION_START_RANGE = .25
const TEXT_SIZE = .4
const TEXT_SIZE_ZOOMED = .2

export type ClockProps = {
  currentEventIndex: number
  setCurrentEventIndex: (currentEventIndex: number) => void
}


const Clock: FC<ClockProps> = ({
  currentEventIndex,
  setCurrentEventIndex
}) => {
  const currentEvent = architects[currentEventIndex]
  const invertColor = !!currentEvent
  const length = architects.length

  const [transitionStart, setTransitionStart] = useState(0)
  const [color, setColor] = useState(invertColor ? 'white' : '#9f9f9f')

  const { clock } = useThree()

  useEffect(() => {
    setTransitionStart(clock.getElapsedTime())
    setColor(invertColor ? 'white' : '#9f9f9f')
  }, [invertColor])

  const mousePointerProps = useMousePointerOnHover()

  const [clockRotation, setClockRotation] = useState(0)

  const data = useScroll()

  useFrame(() => {
    const range = data.range(CLOCK_ROTATION_START_RANGE, 1) * (1 / (1 - CLOCK_ROTATION_START_RANGE)) * .99
    setClockRotation(range * Math.PI * 2)

    const noneSelected = data.range(0, CLOCK_ROTATION_START_RANGE) < CLOCK_ROTATION_START_RANGE
    const newEventIndex = noneSelected ? -1 : Math.floor(range * length)
    if (currentEventIndex !== newEventIndex)
      setCurrentEventIndex(newEventIndex)

  })
  

  const tickLength = currentEventIndex === -1 ? TICK_LENGTH : TICK_LENGTH_ZOOMED
  const textSize = currentEventIndex === -1 ? TEXT_SIZE : TEXT_SIZE_ZOOMED

  return (
    <>
      <CameraControls />
      <ambientLight intensity={10} />
      <group
        rotation={[0, 0, clockRotation]}
      >
        {architects.map((event, eventIndex) => {
          const rotation = -Math.PI * 2 * eventIndex / length

          return (
            <group
              scale={[.25, .25, .25]}
              key={eventIndex}
              rotation={[0, 0, rotation]}
            >
              <TextThree
                text={event.name}
                position={[0, CLOCK_RADIUS + tickLength / 2, 0]}
                rotation={[0, 0, -rotation - clockRotation]}
                scale={[textSize, textSize, textSize]}
                color={color}
              />
              <Sphere
                position={[0, CLOCK_RADIUS + tickLength / 2, 0]}
                scale={[1.5, 1, 1]}
                rotation={[0, 0, -rotation - clockRotation]}
                {...mousePointerProps}
                // onClick={() => setCurrentEventIndex(eventIndex)}
              >
                <meshStandardMaterial
                  transparent
                  opacity={0}
                />
              </Sphere>
              <Box
                position={[0, CLOCK_RADIUS - tickLength / 2, 0]}
                scale={[TICK_WIDTH, tickLength, TICK_WIDTH]}
              >
                <meshStandardMaterial
                  color={color}
                />
              </Box>

              {Array.from({ length: NUMBER_OF_SUBTICKS }, (v, index) =>
                <group
                  key={index}
                  rotation={[0, 0, Math.PI * 2 / length / NUMBER_OF_SUBTICKS * index]}
                >
                  <Box
                    position={[0, CLOCK_RADIUS - tickLength / 2, 0]}
                    scale={[TICK_WIDTH * SUBTICK_SCALE, tickLength * SUBTICK_SCALE, TICK_WIDTH * SUBTICK_SCALE]}
                  >
                    <meshStandardMaterial
                      color={color}
                    />
                  </Box>
                </group>
              )}
            </group>
          )
        })}
      </group>
    </>
  )
}


export default Clock
