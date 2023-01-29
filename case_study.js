const monthToRomanConverter = () => {
  const d = new Date();
  let month = d.getMonth();
  let roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  return roman[month]
}

const dateYearGenerator = () => {
  const d = new Date();
  let date = d.getDate().toString()
  // let date = '5'
  let year = d.getFullYear().toString().slice(-2)
  if (date.length === 1) date = `0${date}`
  return `${year}${date}`
}

const orderNumberGenerator = (productType="", orderNumbers=[]) => {
  let month = monthToRomanConverter()
  let dateYear = dateYearGenerator()

  if(Array.isArray(orderNumbers)){
    let bootcampOrderNumbers = []
    let webinarOrderNumbers = []
    
    if(orderNumbers.length>0){
      orderNumbers.forEach(num => {
        let check = num.substring(0,3)
        if (check === 'HMS'){
          bootcampOrderNumbers.push(num)
        }else{
          webinarOrderNumbers.push(num)
        }
      })
    }
    
    switch(productType){            
      case 'bootcamp':       
        let orderHMS=''
        if(bootcampOrderNumbers.length == 0){
          orderHMS = '0001'
        }else{
          let calculateHMS = parseInt(bootcampOrderNumbers.slice(-1)[0].slice(-4))+1
          orderHMS = `000${calculateHMS}`.slice(-4)
        }

        let orderNumberHMS = `HMS/${month}/${dateYear}${orderHMS}`
        return orderNumberHMS

      case 'webinar':
        let orderHSR=''
        if(webinarOrderNumbers.length == 0){
          orderHSR = '0001'
        }else{
          let calculateHSR = parseInt(webinarOrderNumbers.slice(-1)[0].slice(-4))+1
          orderHSR = `000${calculateHSR}`.slice(-4)
        }

        let orderNumberHSR = `HSR/${month}/${dateYear}${orderHSR}`
        return orderNumberHSR

      default:
        return 'UNDEFINED_TYPE'
    }

  }else{
    return "UNDEFINED_TYPE"
  }
 
}


// HMS untuk Produk Bootcamp 
// HSR untuk Produk Webinar

let productType = 'bootcamp'
// let productType = 'webinar'

let orderNumbers=[]
// let orderNumbers = ["HMS/VII/22220001","HSR/VII/22220001","HSR/VII/22220002"]
// let orderNumbers = ["HMS/VII/22220001"]
// let orderNumbers = ["HSR/VII/22220001"]
// let orderNumbers = ["HMS/VII/22220001","HSR/VII/22220001","HSR/VII/22220002"]



// let productType = 'test' //trigger the false condition
// let orderNumbers = '' //trigger the false condition

console.log(orderNumberGenerator(productType, orderNumbers))


