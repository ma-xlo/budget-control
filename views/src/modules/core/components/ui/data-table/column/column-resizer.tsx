import { Header } from '@tanstack/react-table'

export const ColumnResizer = ({ header }: { header: Header<any, unknown> }) => {
  if (header.column.getCanResize() === false) return <></>

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `absolute top-0 right-0 cursor-col-resize w-px h-full hover:bg-border hover:w-1`,
        style: {
          userSelect: 'none',
          touchAction: 'none',
        },
      }}
    />
  )
}
