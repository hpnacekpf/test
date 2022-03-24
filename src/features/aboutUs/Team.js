import React from 'react'
//component
import TeamItem from './TeamItem'
// constant
import { ABOUT_US_MEMBER_LIST } from 'constants/image'

const Team = () => {
  return (
    <sections className="the-team">
      <div className="d-flex justify-content-center text-uppercase font-weight-bold font-size-28 mt-30">
        <span className="text-color-primary-v2 about-us_title">The team</span>
      </div>

      <div className=" px-25">
        <div className="row">
          {ABOUT_US_MEMBER_LIST.map((member, index) => (
            <TeamItem img={member.img} imgReal={member.imgReal} key={index} />
          ))}
        </div>
      </div>
    </sections>
  )
}

export default Team
