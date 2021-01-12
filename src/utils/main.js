import moment from 'moment';

export const getFileExtension = filename => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export const checkExerciseScore = (exerciseInputFields, userChoice)=>{

  let totalScore = 0;
  let wrongAnswers = [];

  exerciseInputFields.forEach(field => {
    
    switch(field.type){
      case 'radio-group':
        {
          let trueAnswer = field.options.filter(option => option.isTrue);
          if(trueAnswer.find(element => element.option ===userChoice[field.name]))
          {
            totalScore++
          }
          else{
            wrongAnswers.push(field.name)
            console.log(`${field.name} is wrong`)
          }
        }
        break;
      case 'checkbox-group':
        {
          let trueAnswers = field.options.filter(option => option.isTrue).map(el => el.option);
          let isAllTrue = true;

          console.log(trueAnswers)
          console.log(userChoice[field.name])

          if(trueAnswers.length === userChoice[field.name].length)
          {
            userChoice[field.name].forEach(answer => {
              if(!(trueAnswers.includes(answer))) {
                isAllTrue=false;
              }
            })
          }
          else {
            isAllTrue = false;
          }

          if(isAllTrue)
          totalScore++
          else{
            wrongAnswers.push(field.name)
            console.log(`${field.name} is wrong`)
          }

        }
        break
      case 'date':
        if(moment(userChoice[field.name]).fromNow() === moment(field.trueAnswer).fromNow())
        totalScore++
        else{
          wrongAnswers.push(field.name)
          console.log(`${field.name} is wrong`)
        }
        break;
      case 'rate':
      case 'slider':       
        if(userChoice[field.name] === field.trueAnswer)
        totalScore++   
        else{
          wrongAnswers.push(field.name)
          console.log(`${field.name} is wrong`)
        }    
        break;
      case 'text-area':
      case 'input':

        const answer = userChoice[field.name].replace(/\s/g, "");
        const answersArray =  field.trueAnswer.split(";");


        if(answersArray.find(element => element.replace(/\s/g, "").toLowerCase() === answer.toLowerCase()))
        totalScore++
        else{
          wrongAnswers.push(field.name)
          console.log(`${field.name} is wrong`)
        }

        break;

      default: break;
    }

  });

  return {total: totalScore, errors: wrongAnswers};
}

//Pagination paging function

export const currentPageData = (collection, paginationPage_Size)=>{
    const subCollection = []

    //collection is the whole collection of items
    //paginationPage_Size is array(page, size) of pagination

    for(
        let i = (paginationPage_Size[0]-1) * paginationPage_Size[1]; 
        i < paginationPage_Size[1] * paginationPage_Size[0]; 
        i++)
    {
        if(collection[i]) 
        {
            subCollection.push(collection[i])
        }
        else break;
    }

    return subCollection;
}

export const  scrollFunction = ()=> {
    const mybutton = document.querySelector('.back-to-top-botton');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
}

export const topFunction = ()=> {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//#region Rich text editr configs
export const modules = {
    toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['image', 'link'],
  
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
  ],
  imageDrop: true,
}
  
export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block', 'color', 'background',
    'size', 'align', 'direction', 'indent', 'font', 'script'
];

export const modulesForQuestion = {
  toolbar: [
    ['bold', 'italic', 'underline',],        // toggled buttons
    ['code-block'],
    ['image'],
  
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    
    ['clean']                                         // remove formatting button
  ],
  imageDrop: true,
}

export const formatsForQuestion =[
    'bold', 'italic', 'underline',
    'list', 'bullet', 
    'image', 'code-block',
]
//#endregion 

export const addResourceToCard = (cartItems, cartItemToAdd)=>{

  const existingCartItem = cartItems.find(cartItem => cartItem._id === cartItemToAdd._id)
    
    if(existingCartItem)
    {
        return [ ...cartItems ]
    }

    return [...cartItems, cartItemToAdd ]  

}

export const getValidFileName = (fileName)=>{
  return fileName.replace(/[\/|\\\s:*!?"<>]/g, "_")
}