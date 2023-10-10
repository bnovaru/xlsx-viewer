document.getElementById('xlsxFileInput').addEventListener('change', function (event) {
    var file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
        // Este recorrido puede simplificarse pero de esta manera
        // se puede ir comprobando la conversion
        var xlsxdata = event.target.result
        var data = XLSX.read(xlsxdata, { type: 'array' })
        console.log('Objeto predefinido por la biblioteca XLSX:')
        console.log(data)

        var desiredsheet = data.Sheets[data.SheetNames[0]]
        console.log('Array CRUDOde toda la pagina xlsx:')
        console.log(desiredsheet)

        var jsondata = XLSX.utils.sheet_to_json(desiredsheet)
        console.log('Array JSON de toda la pagina xlxs:')
        console.log(jsondata)

        var jsonArray = jsondata.filter(function (array) {
            return array.id
        })
        console.log(jsonArray)

        rellenarSelect(jsonArray)
    };
    // Si no leemos el buffer binario el reader no lo 
    // procesa y no se obtiene nada
    reader.readAsArrayBuffer(file)
})

function rellenarSelect(array) {
    var select = document.getElementById('selectProvincia')

    for (var object of array){
        var option = document.createElement('option')
        // Es aqui donde la logica cambia segun los 
        // datos del xlsx
        option.value = object.id
        option.text = object.nombre
        select.appendChild(option)
    }
}
