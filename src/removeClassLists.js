//TODO Check and remove classlist function
const removeClassLists = (quality) =>{
        
    if (quality.classList.contains("excellent")){
        quality.classList.remove("excellent");
    }
    else if (quality.classList.contains("fine")){
        quality.classList.remove("fine");
    }
    else if (quality.classList.contains("moderate")){
        quality.classList.remove("moderate");
    }
    else if (quality.classList.contains("poor")){
        quality.classList.remove("poor");
    }
    else if (quality.classList.contains("veryPoor")){
        quality.classList.remove("veryPoor");
    }
    else {
        quality.classList.remove("severe");
    }  
}

export{
    removeClassLists
}