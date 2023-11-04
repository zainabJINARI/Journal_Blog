document.addEventListener('DOMContentLoaded', function(){
    const img =  document.querySelector('.dashboard-img')
    const addBlog = document.querySelector('.add-blog')
    const allSection = document.querySelectorAll('.visible')
    const navBar = document.querySelector('.nav-dashboard')
    const updateBlog = document.querySelector('.update-blog')
    const manageBtn = document.querySelector('.manage')
    manageBtn.addEventListener('click',(event)=>{
        event.preventDefault()
        allSection.forEach((e)=>{
            e.style.display='none'
        })        
        navBar.style.display='flex'
        img.style.display='flex'
    })
    manageBtn.addEventListener('dblclick',(event)=>{
        event.preventDefault()
        navBar.style.display='none'
    })
    document.querySelector('.add').addEventListener('click',(event)=>{
        event.preventDefault()
        allSection.forEach((e)=>{
            e.style.display='none'
        }) 
        addBlog.style.display='block'
    })
    document.querySelector('.update').addEventListener('click',(event)=>{
        event.preventDefault()
        allSection.forEach((e)=>{
            e.style.display='none'
        }) 
        updateBlog.style.display='block'
    })
    
})
