/**
 * Exercice todo
 */
//Créer un tableau de 3 todos[], chaque todo{} est un objet qui comporte 3 propriétés : name<string>, description<string>, done<boolean>
let todos = [
    {
        name: 'Aller chercher les enfants à l\'école',
        description: 'lorem ipsum je sais pas quoi dire',
        done: false,
    },
    {
        name: 'Faire les courses',
        description: 'lorem ipsum je sais pas quoi dire',
        done: false,
    },
    {
        name: 'Regarder la série The witcher sur Netflix',
        description: 'lorem ipsum je sais pas quoi dire',
        done: true,
    }
];
console.log(todos);

/**
 * Parcours le tableau des todos pour créer un nouveau
 * tag html <li> avec chaque valeur de todo{}
 * Le code généré devra ressembler à ça:
 * 
 * <li class="done"><strong>intitulé de la todo</strong><br>
 * description de la todo</li>
 * 
 * injecter le code généré dans le ul#todoList
 */
function displayTodoList() {
    const ulList = document.getElementById( 'todoList' );
    //on vide le contenu html du ul
    ulList.innerHTML = '';

    //on parcours le tableau des todos pour créer une nouvelle li pour chaque todo du tableau todos
    let i = 0;
    for (const todo of todos) {
        /* console.log( todo.name );
        console.log( todo.description );
        console.log( todo.done ); */

        //crée un nouveau tag li (en mémoire)
        const newLiTag = document.createElement('li');
        const newBtnDeleteDiv = document.createElement( 'div' );
        const newBtnDelete = document.createElement('i');
        newBtnDelete.className = 'fas fa-times-circle';
        newBtnDeleteDiv.setAttribute('data-index', i);

        //remplis le code html du li avec cette phrase
        newLiTag.innerHTML = `<strong>${ todo.name }</strong><br>${ todo.description } `;
        //règle la classe de la li sur done si la propriété todo.done est true
        if(todo.done) {
            newLiTag.className = 'done';
        }
        //place le nouveau tag li dans le ul
        newBtnDeleteDiv.appendChild( newBtnDelete);
        newLiTag.appendChild( newBtnDeleteDiv);
        ulList.appendChild( newLiTag );
        
        //ajoute un gestionnaire d'événement sur le #btn-delete-${i}
        newBtnDeleteDiv.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeListItem( index );
        });

        i++;
    }
}

//appeler la fonction
displayTodoList();

/**
 * Ajouter un élément à la liste
 * 
 */
function addListItem( newTodo ){
    
    //pousse la nouvelle todo dans le tableau des todos
    todos.push(newTodo);
    
    //mettre à jour la liste dans le code html
    displayTodoList();
}

//ajoute un élément dans la liste
addListItem({
    name: 'Dégager la neige devant la maison',
    description: 'Il fait froid',
    done: false,
});


/**
 * Supprimer un élément à la liste
 *
 */
function removeListItem( index ) {

    todos.splice(index,1);

    //mettre à jour la liste dans le code html
    displayTodoList();
}

// removeListItem(2);


/** 
 * écoute l'envoi du formulaire pour créer 
 * dynamiquement une nouvelle todo à partir 
 * des données saisies par l'utilisateur 
 */
const formTodo = document.querySelector('#formNewTodo');
formTodo.addEventListener('submit', onFormSubmit);
function onFormSubmit(e){
    //empêche l'envoi du formulaire
    e.preventDefault();
    
    console.log('Création d\'une nouvelle todo');

    const newTodo = {};
    //récupérer les valeurs saisies par l'utilisateur dans les champs du formulaire
    //stocker ces valeurs dans des variables
    const inputNameValue = document.getElementById( 'todoName' ).value;
    const inputDescValue = document.getElementById( 'todoDescription' ).value;
    const inputDoneValue = document.getElementById( 'todoDone' ).checked;
    
    //vérifier le contenu saisi, si il n'y a rien, faire une alert('Vous devez saisir tous les champs');
    if ( 
        inputNameValue == '' || inputNameValue.length < 3 ||
        inputDescValue == '' || inputDescValue.length < 3 
    ) {
        alert('Vous devez saisir tous les champs (au moins 3 caractères).');
        return; //sort de la fonction (tout ce qui est après n'est plus exécuté)
    }
    //je place les valeurs saisies dans l'objet vide que j'ai préparé
    newTodo.name = inputNameValue;
    newTodo.description = inputDescValue;
    newTodo.done = inputDoneValue;

    //console.log(newTodo);

    //si tous les champs intitule et description sont bien remplis,
    //Créer une nouvelle todo grâce à la fonction addListItem( <objet(todo)> );
    addListItem( newTodo );
    formTodo.reset();
    
}


/**
 * Changer l'image d'arrière plan avec les boutons images
 */
const liBgs = document.querySelectorAll('#changeBackground li');

for (const li of liBgs) {
    li.addEventListener('click', onChangeBackground);
}

function onChangeBackground() {
    const bgClass = this.getAttribute('data-class');
    document.body.className= bgClass;
}
