
# pasos para formularios

1. Importar el FormsModule en app.module
2. Poner el ngModel en cada input / necesita el name 
3. poner el autocomplete="off" en el tag form para evitar el autocompletado
4. creamos la funcion save()
5. ejecutamos el save en el evento submit deltag form
6. ponemos el required y vemos como se crea el ng-invalid en el input
7. ponemos el minlength 
8. le damos un id al tag form #CreateUserForm="ngForm"
9. enviamos el CreateUserForm en la funcion save(CreateUserForm) del submit