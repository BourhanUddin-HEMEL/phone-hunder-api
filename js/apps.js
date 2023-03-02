const loadData= async (searchText,dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
    
}

const displayPhone =( phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 20 phones only 
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    // display no phones message
    const noPhone = document.getElementById('no-found-msg'); 
    if(phones.length === 0 ){
        noPhone.classList.remove('hidden');
    }
    else{
        noPhone.classList.add('hidden')
    }
    // display all phones 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="mx-10 h-5/12 w-10/12 p-4 rounded-lg mt-5 shadow-lg  ">
                <img
                class=" p-4 w-full h-2/5"
                src="${phone.image}"
                alt="Sunset in the mountains"
            />
            <div class="px-6 py-3 ">
                    <div class="font-bold text-xl mb-2">${phone.phone_name}</div>
                        <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                        lobortis velit ac accumsan tempus. Aenean vel nulla quis nisl
                        pulvinar sollicitudin.
                        </p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" 
                    data-modal-target="phoneDetailsModal" data-modal-toggle="phoneDetailsModal"
                        class="bg-blue-500 block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="button"
                        >
                        View details
                    </button>
            </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}
// process the search data 
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchText = document.getElementById('search-field').value ;
    loadData(searchText,dataLimit);
}
//search click evenlistener
document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    processSearch(10);
})

// search input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});
//togglespinner section 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }
    else{
        loaderSection.classList.add('hidden')
    }

}
// not the best way to show all
 document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();

 });

 const loadPhoneDetails = async id => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    
 }
// loadData();
    // const displayPhone = phones =>{
    //     const phonesContainer = document.getElementById('phones-container');
    
    //     phones.forEach(phone => {
    //         const phoneDiv = document.createElement('div');
    //         phoneDiv.classList.add('bg-white', 'rounded-lg', 'overflow-hidden', 'shadow-md', 'hover:shadow-lg');
    //         phoneDiv.innerHTML = `
    //           <div class="relative">
    //             <img class="w-full" src="${phone.image}" alt="Phone image">
    //             <div class="absolute top-0 right-0 p-2 bg-gray-800 text-white text-sm">${phone.price}</div>
    //           </div>
    //           <div class="p-4">
    //             <h2 class="text-gray-900 font-bold text-xl mb-2">${phone.name}</h2>
    //             <p class="text-gray-700 text-base">${phone.description}</p>
    //             <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View details</button>
    //           </div>
    //         `;
    //         phonesContainer.appendChild(phoneDiv);
    //     });
    // }
