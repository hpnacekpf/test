import { singPassImg } from 'constants/index'
import { getUserNOA, getUserSingPass, isInvalidNOA } from 'extensions/user'
import { withSingPass } from 'hocs/withSingPass'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import PropTypes from 'prop-types'
import React from 'react'
import ButtonSingPass from './buttonSingPass'
import numberExtensions from 'extensions/number'

const ProfileSingPass = ({
  id,
  singpass: spStore,
  isVerifySingPass,
  openModalSingPass,
  openModalNOA,
  isSameSingpass
}) => {
  const user = useGetUser()

  const singpass = getUserSingPass(user)

  const isVerified = singpass ? true : spStore ? !singpass?.error : false

  const noa = getUserNOA(user)

  const isInvalid = isInvalidNOA(user)

  return (
    <section className="mt-0 card-body-mobile card font-cabin singpass__profile">
      <section
        className="mt-0 card-body-mobile card font-cabin"
        style={{ border: '1px solid #e4e9f0' }}
      />
      <div className="card-header d-flex justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="lendor-title__border text-center-align">
            <h2 className="d-inline title-border font-size-20">
              <span className="mb-0 lendor-color-primary-v1 text-uppercase">
                IDENTITY VERIFICATION VIA SINGPASS
              </span>
            </h2>
          </div>
        </div>
      </div>
      {/* <div className="card-body d-flex justify-content-center "> */}
      <div className="card-body d-flex justify-content-center ">
        <div className="col-lg-10 col-md-12">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <div className="d-flex justify-content-around justify-content-md-between align-items-center">
                <div className="font-size-16">Status</div>
                <div className="d-flex align-items-center">
                  <div className="singpass-icon__verification mr-2">
                    <i
                      className={
                        isVerified && !isSameSingpass
                          ? 'icon-success'
                          : 'icon-error'
                      }
                    />
                  </div>
                  <div className="font-size-16">
                    {isVerifySingPass && !isSameSingpass
                      ? 'Verifying'
                      : isVerified && !isSameSingpass
                        ? 'Verified'
                        : isSameSingpass && !isVerified
                          ? 'Verification unsuccessful'
                          : 'Unverified'}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 align-self-center text-center">
              {isVerifySingPass ? (
                <div className="text-center px-4">
                  <div className="dot-pulse" />
                </div>
              ) : isVerified && !isSameSingpass ? (
                <img
                  className="singpass-img__profile img-fluid"
                  src={singPassImg}
                  alt="Singpass"
                />
              ) : (
                <ButtonSingPass
                  onClickButton={() =>
                    openModalSingPass({
                      redirectUrl: `edit-profile/${id}`,
                      hideDescription: true
                    })
                  }
                  pathname={`/edit-profile/${id}`}
                  isCustomButton={true}
                  buttonName="Verify Now"
                  buttonCss="btn-color-main-outline btn-large text-uppercase infoCard__title btn-xlarge-100"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isVerified && !isSameSingpass ? (
        <div className="card-body  ">
          <div className="row">
            <div className="col-1" />
            <div className="col-11 mb-5">
              <div>
                <span className="font-size-16">Partial NRIC/FIN</span>
                <p className="font-size-16">{singpass?.partialuinfin}</p>
              </div>
              <div>
                <span className="font-size-16">Principal Name</span>
                <p className="font-size-16">{singpass?.name}</p>
              </div>
              <div>
                <span className="font-size-16">Sex</span>
                <p className="font-size-16">{singpass?.sex}</p>
              </div>

              <div>
                <span className="font-size-16">Race</span>
                <p className="font-size-16">{singpass?.race}</p>
              </div>
              <div>
                <span className="font-size-16">Date of Birth </span>
                <p className="font-size-16">{singpass?.dob}</p>
              </div>
              <div>
                <span className="font-size-16">Nationality</span>
                <p className="font-size-16">{singpass?.nationality}</p>
              </div>
              <div>
                <span className="font-size-16">Registered Address</span>
                <p className="font-size-16">{singpass?.regadd}</p>
              </div>
              <div>
                <span className="font-size-16">Pass Type</span>
                <p className="font-size-16">{singpass?.passtype}</p>
              </div>
              {noa ? (
                <div>
                  <span className="font-size-16">
                    Notice of Assessment (Basic,{' '}
                    {isInvalid ? noa.yearOfAssessment ?? '-' : 'Latest Year'})
                  </span>
                  <p className="font-size-16">
                    {noa.amount
                      ? numberExtensions.showFormatPrice(noa.amount)
                      : '-'}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="text-center">
            <ButtonSingPass
              forceUpdate={true}
              onClickButton={() =>
                openModalSingPass({
                  redirectUrl: `edit-profile/${id}`,
                  hideDescription: true,
                  forceUpdate: true
                })
              }
              pathname={`/edit-profile/${id}`}
              isCustomButton={true}
              buttonName="Update verification"
              buttonCss="btn-color-main-outline font-size-20 btn-large text-uppercase infoCard__title btn-xlarge-100"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}

ProfileSingPass.propTypes = {
  id: PropTypes.string.isRequired
}

export default withSingPass({
  allowPopup: true,
  allowPopupSuccess: true,
  allowNOA: true,
  checkNOAMinimum: false,
  forceVerifyNOA: true
})(ProfileSingPass)
