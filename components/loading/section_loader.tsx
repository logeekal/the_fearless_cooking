import { PropsWithChildren } from 'react'

import { sectionLoader } from './section_loader.css'

type SectionLoaderProps = {
  title: React.ReactNode | string
}

export const SectionLoader = (props: PropsWithChildren<SectionLoaderProps>) => {
  const { title, children } = props
  return (
    <div className={`section-loader ${sectionLoader}`}>
      <div className="section-loader__loader">{children}</div>
      <div className="section-loader__title">{title}</div>
    </div>
  )
}
