import { JWTAuth } from '../../../../../src/modules/user/services/JWTAuth'

const testSecret = 'VXlbZdZiDctgU7vSvsFAzevsIcqET82lJJhWMdVIopc='
const authService = new JWTAuth(testSecret)

const testPayload = { id: '123', email: 'apg@gmail.com'}

describe('JWTAuth service', () => {
  it('Should create a token', () => {
    const token = authService.signToken(testPayload)
    expect(token).toBeTruthy()
  })

  it('Should decode a valid token', () => {
    const token = authService.signToken(testPayload)
    const decoded = authService.decodeToken(token)
    expect(decoded.getRight().id).toBe(testPayload.id)
  })

  it('Should return left when trying to decode an invalid token', () => {
    const token = 'invalidtoken'
    const decoded = authService.decodeToken(token)
    expect(decoded.isLeft()).toBe(true)

    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoiYXBnQGdtYWlsLmNvbSIsImlhdCI6MTcwODg5NDEzMX0.7M-739_yB8a6tkLMZ4AYs4_vR1Whqnbc8bL1Qn8BPQI'
    const decodedInvalid = authService.decodeToken(invalidToken)
    expect(decodedInvalid.isLeft()).toBe(true)
  })

})

export {authService}
