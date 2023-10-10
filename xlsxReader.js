document.getElementById('xlsxFileInput').addEventListener('change', function (event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = function (event) {
        // Este recorrido puede simplificarse pero de esta manera
        // se puede ir comprobando la conversion
        var xlsxdata = event.target.result
        var data = XLSX.read(xlsxdata, { type: 'array' })
        console.log('Objeto predefinido por la biblioteca XLSX:')
        console.log(data)

        var desiredsheet = data.Sheets[data.SheetNames[0]]
        var desiredSheet2 = data.Sheets[data.SheetNames[1]]
        console.log('Array CRUDO de toda la pagina xlsx:')
        console.log(desiredsheet)
        console.log(desiredSheet2)

        const jsondata = XLSX.utils.sheet_to_json(desiredsheet)
        const jsondata2 = XLSX.utils.sheet_to_json(desiredSheet2)
        console.log('Array JSON de toda la pagina xlxs:')
        console.log(jsondata)
        console.log(jsondata2)

        // Lo suyo filtrar antes de rellenar el html, 
        // pero en este caso no hace falta
        rellenarSelect(jsondata, 'selectCcaa')

        // Esta llamada la hacemos desde aqui para poder manejar los valores de jsondata2
        document.getElementById('selectCcaa').addEventListener('change', function (event) {
            var ccaaSeleccionada = event.target.value
            var provinciasFiltradas = filtrarProvincias(ccaaSeleccionada, jsondata2)
            rellenarSelect(provinciasFiltradas, 'selectProvincia')
        })
    };
    // Si no leemos el buffer binario el reader no lo 
    // procesa y no se obtiene nada
    reader.readAsArrayBuffer(file)
})



function rellenarSelect(array, nombreDelSelect) {
    var select = document.getElementById(nombreDelSelect)
    // Limpia el select antes de introducir los elementos nuevos
    select.innerHTML = ''

    for (var object of array) {
        var option = document.createElement('option')
        // Es aqui donde la logica cambia segun los 
        // datos del xlsx
        option.value = object.Id
        option.text = object.Descripcion
        select.appendChild(option)
    }
}

function filtrarProvincias(ccaaId, arrayProvincias) {
    var provinciasFiltradas = arrayProvincias.filter(function(provincia){
        return provincia.Comunidadautonoma == ccaaId
    })
    return provinciasFiltradas
}