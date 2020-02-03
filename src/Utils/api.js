import axios from 'axios'

const url="13.59.89.50/v1"

uploadImages = async () =>{
    //List of states when the component load
    this.setState({loading: true, error: null})

    try {
      const listOfStates = await axios({
          method: 'get',
          url: 'http://3.81.42.164/v1/localitation/?country=1&city=0',
      })
      this.state.states.push(...listOfStates.data)
      this.setState({loading: false})
    } catch (error) {
      this.setState({loading: false, error: error})     
    }
}