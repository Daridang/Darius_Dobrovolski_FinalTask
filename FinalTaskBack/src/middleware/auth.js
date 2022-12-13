import { validateAccessToken } from "../controller/tokenController.js"

export const auth = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    console.log('authHeader: ', authHeader)
    if (!authHeader) {
      return res.status(401).json({
        msg: 'Not Authorized 1'
      })
    }

    const accessToken = authHeader.split(' ')[1]
    console.log('accessToken: ', accessToken)
    if (!accessToken) {
      return res.status(401).json({
        msg: 'Not Authorized 2'
      })
    }

    const userData = validateAccessToken(accessToken)

    if (!userData) {
      return res.status(401).json({
        msg: 'Not Authorized 3'
      })
    }

    req.userId = userData._id

    next()
  } catch (error) {
    console.log(error)
  }
}