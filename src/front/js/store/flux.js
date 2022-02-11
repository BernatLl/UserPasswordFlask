const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: (email, password) =>{
				fetch('postgresql://gitpod@localhost:5432/login', {
				 method: 'POST',
				 headers: {
				 	'Content-type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({email: email, password: password})
			}).then((res)=> res.json())
			.then((data) => {
				localStorage.setItem('token', data.token);
			}).catch((err)=>	console.error(err)) 
			},

			

			getMessage: function () {
				// fetching data from the backend
				fetch('postgresql://gitpod@localhost:5432/me', {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				}).then((res) => res.json())
					.then((data) => {
						console.log(data);
					}).catch((err) => console.error(err));
			},

			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
