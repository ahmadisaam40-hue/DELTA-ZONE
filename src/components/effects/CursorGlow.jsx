import { useEffect } from 'react'

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById('cursor-glow')
    const cursor = document.getElementById('custom-cursor')
    if (!glow || !cursor) return

    const onMove = (e) => {
      glow.style.left = `${e.clientX}px`
      glow.style.top = `${e.clientY}px`
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const onHover = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute?.('role') === 'button'
      ) {
        cursor.classList.add('hover')
        glow.style.width = '350px'
        glow.style.height = '350px'
      } else {
        cursor.classList.remove('hover')
        glow.style.width = '250px'
        glow.style.height = '250px'
      }
    }

    const onLeave = () => {
      glow.style.opacity = '0'
      cursor.style.opacity = '0'
    }
    const onEnter = () => {
      glow.style.opacity = '1'
      cursor.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onHover)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onHover)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div id="cursor-glow" className="cursor-glow" />
      <div id="custom-cursor" className="custom-cursor" />
    </>
  )
}
