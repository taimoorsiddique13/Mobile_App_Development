import axios from "axios";
export default axios.create({
  baseURL:"https://api.yelp.com/v3/businesses",
  headers:
  {
    Authorization: " Bearer LCTICHVxkXY7ncKAjlYUwrxdRDNxOxhTli0MAtsekKZ-O2IK8An3lcIq9fUXDDMDSjuoUo4LZ3IK4ta-d4j_0wn1QLpYPKEejUmEvpUY4jwPGkX3Js4DFMhu0sb7ZXYx"
}
});