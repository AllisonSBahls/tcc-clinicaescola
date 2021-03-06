//De acordo com que o usuário digita
    // $(document).ready(function(){
    //     $('#search-name-patient').keyup(function(){
    //       $('form').submit(function(){
    //         $('#table-patient').empty();
    //         var dados = $(this).serialize();
    //         $.ajax({
    //           url:'/paciente/search',
    //           type: 'POST',
    //           dataType: 'json',
    //           data: dados,
    //           success: function(data){
    //             $('#table-patient').empty();

    //               for(i=0;i<data.length; i++){
    //                 $('#table-patient').append('<tr><th>' + data[i].name + '</th><td>' + data[i].userPatient.email + '</td><td>' +data[i].phone+ '</td></tr>');
    //             }
    //           }
    //         });
    //         return false;
    //       });
    //       $('form').trigger('submit');
    //     })
    //   })

    //Ao clicar em buscar
    $(document).ready(function () {
        $('#search-name-patient').click(() => {
            $('.form-search-name').submit(function () {
                var dados = $(this).serialize();
                $.ajax({
                    url: '/paciente/search',
                    type: 'POST',
                    dataType: 'json',
                    data: dados,
                    success: function (data) {
                        $('#table-patient').empty();
                        for (var i = 0; i < data.length; i++) {
                            $('#table-patient').append('<tr><th>' + data[i].name + '</th><td>' + data[i].userPatient.email + '</td><td>' + data[i].phone + '</td><td>' + '<a class="btn btn-primary primary btn-sm" href="paciente/profile/' + data[i].id + '"><img src="img/icons/common/eye.svg"></a> '+ '</td><td>' + '<a class="btn btn-danger delete btn-sm" onclick="return confirm(`Você confirma a exclusão?`)" href="paciente/delete/' + data[i].userPatient.id + '"><i class="ni ni-lg ni-basket text-white"></a> </td></tr>');
                        }
                    }
                })
                return false;

            })
            $('.form-search-name').trigger('submit');

        });
    })

    $(document).ready(function () {
        $('#search-name-master').click(() => {
            $('.form-search-name').submit(function () {
                var dados = $(this).serialize();
                $.ajax({
                    url: '/supervisor/search',
                    type: 'POST',
                    dataType: 'json',
                    data: dados,
                    success: function (data) {
                        $('#table-master').empty();
                        for (var i = 0; i < data.length; i++) {

                            $('#table-master').append('<tr><th>' + data[i].name + '</th><td>' + data[i].userMaster.email + '</td><td>' + data[i].phone + '</td><td>' + '<a class="btn btn-primary primary btn-sm" href="supervisor/profile/' + data[i].id + '"><img src="img/icons/common/eye.svg"> </a>  '+ '</td><td>' + '<a class="btn btn-danger delete btn-sm" onclick="return confirm(`Você confirma a exclusão?`)" href="supervisor/delete/' + data[i].userMaster.id + '"><i class="ni ni-lg ni-basket text-white"></a> </td></tr>');
                        }
                    }
                })
                return false;

            })
            $('.form-search-name').trigger('submit');

        });
    })

    $(document).ready(function () {
        $('#search-name-trainee').click(() => {
            $('.form-search-name').submit(function () {
                var dados = $(this).serialize();
                $.ajax({
                    url: '/estagiario/search',
                    type: 'POST',
                    dataType: 'json',
                    data: dados,
                    success: function (data) {
                        $('#table-trainee').empty();
                        for (var i = 0; i < data.length; i++) {
                            $('#table-trainee').append('<tr><th>' + data[i].name + '</th><td>' + data[i].userTrainee.email + '</td><td>' + data[i].phone + '</td><td class="col-pad">' + ' <a class="btn btn-primary btn-sm" href="estagiario/profile/' + data[i].id + '"><img src="img/icons/common/eye.svg"> </a> '+ '</td><td class="col-pad">' + ' <a class="btn btn-primary btn-sm" href="frequencias/' + data[i].id + '"><img src="img/icons/common/list.svg"> </a> ' + '</td><td>' + ' <a class="btn btn-primary btn-sm" href="reports/' + data[i].id + '"><i class="ni ni-lg ni-collection text-white"></i> </a>'  + '</td><td  class="col-pad">' +'<a class="btn btn-danger delete btn-sm" onclick="return confirm(`Você confirma a exclusão?`)"href="estagiario/delete/' + data[i].userTrainee.id + '"><i class="ni ni-lg ni-basket text-white"></a> </td></tr>');
                        }
                    }
                })
                return false;

            })
            $('.form-search-name').trigger('submit');

        });
    });

   

    $(document).ready(function () {
        $('#search-name-secretary').click(() => {
            $('.form-search-name').submit(function () {
                var dados = $(this).serialize();
                $.ajax({
                    url: '/recepcionista/search',
                    type: 'POST',
                    dataType: 'json',
                    data: dados,
                    success: function (data) {
                        $('#table-secretary').empty();
                        for (var i = 0; i < data.length; i++) {
                            $('#table-secretary').append('<tr><th>' + data[i].name + '</th><td>' + data[i].userSecretary.email + '</td><td>' + data[i].phone + '</td><td>' + ' <a class="btn btn-primary primary btn-sm" href="recepcionista/profile/' + data[i].id + '"><img src="img/icons/common/eye.svg"> </a> '+ '</td><td>' +  '<a class="btn btn-danger delete btn-sm " onclick="return confirm(`Você confirma a exclusão?`)"href="recepcionista/delete/' + data[i].userSecretary.id + '"><i class="ni ni-lg ni-basket text-white"></a> </td></tr>');
                        }
                    }
                })
                return false;

            })
            $('.form-search-name').trigger('submit');

        });
    })
   
    $(document).ready(function () {
        $('#selected-consult-frequence').change(function () {

            $('#form-select').submit(function () {
            var dados = ($(this).serialize());

            $.ajax({
                url: '/frequencias/register',
                type: 'POST',
                dataType: 'json',
                data: dados,
                success: function (data) {
                    $('#consult-id').val(data.id)
                    var dt = moment.parseZone(data.dateStart);
                    $('#date-consult').val(dt.format('YYYY-MM-DD'))
                    $('#hours-consult').val(dt.format('HH:mm'))
                }
            })
            return false;
            
        })
        $('#form-select').trigger('submit');
    })
})

$(document).ready(function () {
    $('#selected-consult-reports').change(function () {
    
        $('#form-reports').submit(function () {
        var dados = ($(this).serialize());

        $.ajax({
            url: '/relatorios/register',
            type: 'POST',
            dataType: 'json',
            data: dados,
            success: function (data) {
                $('#consult-id').val(data.id)
                var dt = moment.parseZone(data.dateStart);
                $('#datetime-consult').val(dt.format('YYYY-MM-DDTHH:mm'))
                $('#patient-name').val(data.consultPatient.name)
                // console.log(data.consultPatient.name)
            }
        })
        return false;
    })
    $('#form-reports').trigger('submit');
})
})
