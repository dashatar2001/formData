//id,name,surname,patronymic,city,adr1,adr2,adr3,salary,telNumber,dateCreat,dataChange


$(document).ready(function () {
    // localStorage.clear();


    let dataForm=new DataForm();
    let dom=new DOM();
    if(!localStorage.getItem("count"))localStorage.setItem("count",0);
    var count=+localStorage.getItem("count");
    // $(".numbers").mask('9 (999) 999-99-99');

    if(count!==0) {
        for (let i =0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            if(key!=="count"){ dataForm.creatTr(JSON.parse(localStorage.getItem(key)));}
        }
        dataForm.pagination();
    }

    let meD=new Date;

    $('input#name,input#surname,input#patronymic,input#patronymic, input#city,input#adr1,input#adr2,input#adr3,input#salary, textarea#message').unbind().keyup( function(){

        var id = $(this).attr('id');
        var val = $(this).val();

        switch(id)
        {
            case 'name':
            case 'surname':
            case 'patronymic':
            case 'city':
            case 'adr1':
                var rv_name = /^[а-яА-Я]+$/;

                if(val.length > 2 && val != '' && rv_name.test(val))
                {
                    $(this).addClass('not_error');

                }
                else
                {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;
            case 'adr2':
            case 'salary':
            case 'adr3':
                var rv_name = /^[0-9]+$/
                if( val != '' && rv_name.test(val))
                {
                    $(this).addClass('not_error');
                }
                else
                {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;
        }

    });


    $("input[name='USD']").change(function(){

        let td=$(".salary");

        if(this.checked!==true){
            console.log(2222)
            let usdVal=$(".usdVal")
            for(let i=0;i<usdVal.length;i++){
                usdVal[i].remove();
            }

        }
        else{
            dataForm.ajaxF(145,"usdVal");
        }
    });

    $("input[name='EUR']").change(function(){

        let td=$(".salary");

        if(this.checked!==true){
            console.log(1111)
            let usdVal=$(".eurVal")
            for(let i=0;i<usdVal.length;i++){
                usdVal[i].remove();
            }

        }
        else{
            dataForm.ajaxF(292,"eurVal");
        }
    });



    $(document).on('click touchstart', '.deleteButton', function(){
        $(this).closest(".numbers")[0].remove();
    });

    $(document).on('click touchstart', '.delete',function(){
        let id=$(this).closest("tr")[0].id;
        localStorage.removeItem(id);
        $(this).closest("tr")[0].remove();
    })

    $(document).on('click touchstart', '.change',function(e){
        let id=$(this).closest("tr")[0].id;
        dataForm.changeData(id,e);


    })


    $("#creatUp").on("click",function () {

        let tr=$(".data tr");
        let arr=dataForm.sortF("creatTime");
        for(let i=0;i<arr.length;i++){
            tr[i].remove();
            dataForm.creatTr(JSON.parse(localStorage.getItem(arr[i].idIt)));
        }
        $('#pagination a').remove();
        dataForm.pagination();

    })
    $("#creatDown").on("click",function () {

        let tr=$(".data tr");
        let arr=(dataForm.sortF("creatTime")).reverse();
        for(let i=0;i<arr.length;i++){
            tr[i].remove();
            dataForm.creatTr(JSON.parse(localStorage.getItem(arr[i].idIt)));
        }
        $('#pagination a').remove();
        dataForm.pagination();

    })

    $("#salaryUp").on("click",function () {

        let tr=$(".data tr");
        let arr=dataForm.sortF("salary");
        for(let i=0;i<arr.length;i++){
            tr[i].remove();
            dataForm.creatTr(JSON.parse(localStorage.getItem(arr[i].idIt)));
        }
        $('#pagination a').remove();
        dataForm.pagination();

    })
    $("#salaryDown").on("click",function () {

        let tr=$(".data tr");
        let arr=(dataForm.sortF("salary")).reverse();
        for(let i=0;i<arr.length;i++){
            tr[i].remove();
            dataForm.creatTr(JSON.parse(localStorage.getItem(arr[i].idIt)));
        }
        $('#pagination a').remove();
        dataForm.pagination();

    })


    $('.openmodal').click(function (e) {
        e.preventDefault();
        $('.modal').addClass('opened');
    });
    $('.closemodal').click(function (e) {
        e.preventDefault();
        $('.modal').removeClass('opened');
        dataForm.clearForm();
        $(".modal-header").children("h2").text("Добавить пользователя");
        $("input[data-valid]").removeClass('not_error');
        $("input[data-valid]").removeClass('error');
    });

    $('#addNumber').click(function (e){
        dataForm.addNumber();
    });


    $('#myForm').on("submit",function (event) {
        event.preventDefault();

        if($(".send").attr('id')=="changeForm"){
            event.preventDefault();
            let myDate = new Date();


            let id=$(".send").attr("data-change");
            let user=JSON.parse(localStorage.getItem(id));
            user.name=$('input[id="name"]').val();
            user.surname=$('input[id="surname"]').val();
            user.patronymic=$('input[id="patronymic"]').val();
            user.city=$('input[id="city"]').val();
            user.adr1=$('input[id="adr1"]').val();
            user.adr2=$('input[id="adr2"]').val();
            user.adr3=$('input[id="adr3"]').val();
            user.salary=$('input[id="salary"]').val();
            user.telNumber=dataForm.readNumbers();
            user.dateChange=myDate.toLocaleString();
            if($('.not_error').length == 8) {

                localStorage.setItem(id, JSON.stringify(user));

                $("input[type='text']").removeClass('not_error')
                $("input[type='text']").removeClass('error')

                $(`#${id}`).closest("tr")[0].remove();
                $(".modal-header").children("h2").text("Добавить пользователя");
                $("[id='changeForm']").each(function () {
                    $(this).attr("id", "sendForm");
                });


                dataForm.creatTr(user);
                $('#pagination a').remove();
                dataForm.pagination();

                dataForm.clearForm();
            }
            else{
                $(".modal-header").children("h2").text("Исправьте неверные поля!!!!!");
                return false;
            }

        }else {
            event.preventDefault();
            if($('.not_error').length == 8) {

                let str = dataForm.readNumbers();
                $(".modal-header").children("h2").text("Добавить пользователя");
                $("input[type='text']").removeClass('not_error');
                $("input[type='text']").removeClass('error');


                let myDate = new Date();
                localStorage.setItem("count", ++count);
                let user = new User(count, $('input[id="name"]').val(), $('input[id="surname"]').val(),
                    $('input[id="patronymic"]').val(), $('input[id="city"]').val(),
                    $('input[id="adr1"]').val(), $('input[id="adr2"]').val(),
                    $('input[id="adr3"]').val(), $('input[id="salary"]').val(),
                    str, myDate.toLocaleString(), myDate.toLocaleString());


                localStorage.setItem(`${localStorage.getItem("count")}`, JSON.stringify(user));


                dataForm.creatTr(user);
                $('#pagination a').remove();
                dataForm.pagination();

                dataForm.clearForm();
            }else{
                $(".modal-header").children("h2").text("Исправьте неверные поля!!!!!");
                return false
            }
        }


    })


})


class DataForm{
    creatTr(user){
        $(".data").append(`<tr id="${user.id}">
                           <td>${user.id}</td>
                           <td>${user.surname} </br> ${user.name} </br> ${user.patronymic}</td>
                           <td>${user.city}</td>
                           <td>ул.${user.adr1}, д.${user.adr2},кв.${user.adr3}</td>
                           <td class="salary">${user.salary} BYN</td>
                           <td>${user.telNumber}</td>
                           <td>${user.dateCreat}</td>
                           <td>${user.dateChange}</td>
                           <td>
                                <button class="delete" ">Удалить</button>
                                <button class="change">Изменить</button>
                           </td>

                    </tr>`);


    }
    addNumber(){
        $("#addNumber").before(`<div class="numbers">
                                        <input type="text"  id="telNumber${$(".numbers").length+1}" name="user" placeholder="Номер телефона" size="20" />
                                      <div  class="deleteButton">x</div>
                               </div>`)

        // $(`telNumber${$(".numbers").length+1}`).mask('9 (999) 999-99-99');


    }
    readNumbers(){
        let str = "";

        for (let i = 0; i < $(".numbers").length + 1; i++) {
            str += $(`input[id='telNumber${i}']`).val();
            str += "<br/>";


        }
        return str;

    }
    clearForm(){
        $(".numbers").remove();

        $('.modal').removeClass('opened');
        $("#myForm")[0].reset();

    }
    ajaxF(curId,classType){
        $.ajax({
            type : "GET",
            url : "https://www.nbrb.by/api/exrates/rates?periodicity=0",
            data : {
            },

            timeout : 15000,
            success : function (data,statusText) {
                data.forEach((item)=>{
                    if(item.Cur_ID===curId){
                        let td=$(".salary");
                        let dom=new DOM();

                        for(let i=0;i<td.length;i++){


                            let id=$(`.salary:eq(${i})`).parent().attr("id");

                            let baseSalary=(JSON.parse(localStorage.getItem(id))).salary;

                            let changeSalary=((baseSalary/item.Cur_OfficialRate)*item.Cur_Scale).toFixed(2)

                            let usdVal=dom.ce("p",`${changeSalary} ${item.Cur_Abbreviation}`);
                            usdVal.className=`${classType}`;
                            td[i].append(usdVal);

                        }



                    }
                })


            },

        })

    }
    sortF(type) {
        let td=$(".salary");
        let arr=[];
        for (let i = 0; i < td.length; i++) {

            let id = $(`.salary:eq(${i})`).parent().attr("id");
            let baseSalary;


            if(type=="salary"){
                baseSalary = (JSON.parse(localStorage.getItem(id))).salary;
            }
            if(type=="creatTime"){
                let myDate = new Date((JSON.parse(localStorage.getItem(id))).dateCreat);
                baseSalary=+myDate;
            }


            let sortIt={idIt:`${id}`,salaryIt:`${baseSalary}`}

            arr.push(sortIt);

        }


        arr.sort((prev, next) => prev.salaryIt - next.salaryIt);
        return arr;

    }
    validator(){
        let inputs=$("input[type='text']");


    }
    changeData(id,e){
        let user=JSON.parse(localStorage.getItem(id));
        let phoneArr= user.telNumber.split("<br/>");
        for(let i=0;i<phoneArr.length-1;i++){
            if(i<phoneArr.length-2)dataForm.addNumber();
            $(`input[id='telNumber${i}']`).val(`${phoneArr[i]}`);
        }
        $(".modal-header").children("h2").text("Изменить данные пользователя");
        e.preventDefault();
        $("input[data-valid]").addClass('not_error');
        $('.modal').addClass('opened');
        $('input[id="name"]').val(`${user.name}`);
        $('input[id="surname"]').val(`${user.surname}`);
        $('input[id="patronymic"]').val(`${user.patronymic}`);
        $('input[id="city"]').val(`${user.city}`);
        $('input[id="adr1"]').val(`${user.adr1}`);
        $('input[id="adr2"]').val(`${user.adr2}`);
        $('input[id="adr3"]').val(`${user.adr3}`);
        $('input[id="salary"]').val(`${user.salary}`);

        $("[id='sendForm']").each(function (){
            $(this).attr("id", "changeForm");
        });
        $("#changeForm").attr("data-change",`${id}`);
    }
    pagination(){
        let dom=new DOM();

            var req_num_row = 5;
            var tr = $('tbody tr');
            var total_num_row = tr.length;
            var num_pages = 0;
            if ((total_num_row % req_num_row )=== 0) {
                num_pages = total_num_row / req_num_row;
            }
            if (total_num_row % req_num_row >= 1) {
                num_pages = total_num_row / req_num_row;
                num_pages++;
                num_pages = Math.floor(num_pages++);
            }
            for (var i = 1; i <= num_pages; i++) {
                $('#pagination').append(dom.ce("a", ` ${i} `));
            }
            tr.each(function (i) {
                $(this).hide();
                if (i + 1 <= req_num_row) {
                    tr.eq(i).show();
                }

            });
            $('#pagination a').click(function (e) {
                e.preventDefault();
                tr.hide();
                var page = $(this).text();
                var temp = page - 1;
                var start = temp * req_num_row;

                for (var i = 0; i < req_num_row; i++) {

                    tr.eq(start + i).show();

                }
            });


    }


}
class DOM {

    ce(name,text,event) {
        let elem = document.createElement(name);
        text!=undefined ? elem.innerHTML=text : null;
        event!=undefined ? elem.addEventListener(event.type,event.fn) : null;
        return elem;
    }



}









