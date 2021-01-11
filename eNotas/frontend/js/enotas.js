$( document ).ready(function(){

   	// BOTÃO NA MODEL DE CONFIRMAR A CRIAÇÃO DE UMA NOVA E-NOTA.
	$('.btn_create').click(function(){
		$.ajax({
			url: 'http://localhost:8080/eNotas',
			dataType: 'json',
			contentType: "application/json",
			type: "POST",
			data: JSON.stringify({"title":$("#title_text_create").val(),
								  "text":$("#text_text_create").val(),
								  "data":$("#date_text_create").val()}),
			success: function(){
				recarregar();
			}
		});
		function recarregar(){location.reload();}
	});

	// BOTÃO NA MODEL DE CONFIRMAR A EDIÇÃO DE UMA E-NOTA.
	$('.btn_edit').click(function(){
		$.ajax({
			url: 'http://localhost:8080/eNotas',
			dataType: 'json',
			contentType: "application/json",
			type: "POST",
			data: JSON.stringify({"id":id_edit, // VALOR CAPTURADO AO CLICAR NO BOTÃO DE EDIÇÃO DA div.
	  							  "title":$("#title_text_edit").val(),
								  "text":$("#text_text_edit").val(),
								  "data":$("#date_text_edit").val()}),
			success: function(){
					recarregar();
				}
		});
		function recarregar(){location.reload();}
	});

	// PARA LIMPAR OS CAMPOS DE EDIÇÃO.
	$("#create_nota").val("");
	$(".edit_send").val("");

	// CONFIGURAÇÃO DO RIVETS.
	rivets.configure({
		prefix: 'rv', // Attribute prefix in templates
		preloadData: true, // Preload templates with initial data on bind
		rootInterface: '.', // Root sightglass interface for keypaths
		templateDelimiters: ['{', '}'], // Template delimiters for text bindings
		iterationAlias : function(modelName){ // Alias for index in rv-each binder
			return '%' + modelName + '%';
		},
		handler: function(target, event, binding){ // Augment the event handler of the on-* binder
			this.call(target, event, binding.view.models)
		},
		executeFunctions: false // Since rivets 0.9 functions are not automatically executed in expressions. If you need backward compatibilty, set this parameter to true
	})

	// ARMAZENA O id A SER ENVIADO PARA O BACK-END.
	var id_edit;

	// SELECIONAR DATA PELO CALENDÁRIO.
	$(function(){
		$("#date_text_create").datepicker({
			showButtonPanel:true,
			dateFormat: 'dd/mm/yy'
		});
	});
	$(function(){
		$("#date_text_edit").datepicker({
			showButtonPanel:true,
			dateFormat: 'dd/mm/yy'
		});
	});

	// AJAX DOS DADOS PREENCHIDOS NA TELA.
	$.ajax({
		url: 'http://localhost:8080/eNotas',
		dataType: 'json',
		type: 'GET',
		success: function(data){

			// PREENCHER OS DADOS NA TELA.
			$(data).each(function(index, value){
				// MONTA A ESTRUTURA PARA COLOCAR OS DADOS NA TELA.
				// ESSE HTML DEVE SER CRIADO AQUI, POIS É NECESSÁRIO QUE TENHA UM id ESPECÍFICO DADO NESTE MOMENTO.
				/*
				$('#div_notas').append(	'<div id="div_rivets">'+
											'<div id="'+value.id+'" class="nota">'+
												'<div id="cabecalho_enota'+value.id+'">'+
													'<h4 id="id"   rv-html="eNota.id"></h4>'+
													'<h4 id="date'+value.id+'" rv-html="eNota.date"></h4>'+
												'</div>'+
												'<h4 id="title'+value.id+'" rv-html="eNota.title"></h4><br>'+
												'<h4 id="text'+value.id+'" rv-html="eNota.text"></h4><br>'+
												'<div class="div_edit" rv-enable="eNota.edit"><i class="fa fa-pencil-square-o" id="'+value.id+'" type="button" aria-hidden="true" data-toggle="modal" data-target="#modal_edit"> Editar</i></div>'+
							   					'<div class="div_delete" rv-enable="eNota.delete"><i class="fa fa-trash-o" id="'+value.id+'" aria-hidden="true"> Excluir</i></div>'+
									   		'</div>'+
								   		'</div>');
				*/
				/*
				<div id="contentWrap">
				    <ol rv-each="truck" rv-value="truck.id">
				        <li rv-each-job="jobs" rv-value="job.id">{ job.job_number }</li>
				    </ol>
				</div>
				*/
				$('#div_notas').append(	'<div id="div_rivets">'+
											'<div id="'+value.id+'" class="nota">'+
												'<div id="cabecalho_enota'+value.id+'">'+
													'<h4 id="id" rv-each="id" rv-html="eNota.id"></h4>'+
													'<h4 id="date'+value.id+'" rv-each="date" rv-html="eNota.date"></h4>'+
												'</div>'+
												'<h4 id="title'+value.id+'" rv-each="title" rv-html="eNota.title"></h4><br>'+
												'<h4 id="text'+value.id+'" rv-each="text" rv-html="eNota.text"></h4><br>'+
								/*Botão editar*/'<div class="div_edit" rv-enable="eNota.edit">'+
													'<i class="fa fa-pencil-square-o" id="'+value.id+'" type="button" aria-hidden="true" data-toggle="modal" data-target="#modal_edit"> Editar</i>'+
												'</div>'+
							   /*Botão deletar*/'<div class="div_delete" rv-enable="eNota.delete">'+
							   						'<i class="fa fa-trash-o" id="'+value.id+'" aria-hidden="true"> Excluir</i>'+
						   						'</div>'+
									   		'</div>'+
								   		'</div>');

				// usar rivets pra isso: rv-each

				// DATA BINDING COM RIVETS JS, COLOCA OS DADOS NA TELA.
				var eNota = {
								'id' : value.id,
								'title': value.title,
								'text': value.text,
								'date': value.data
							}
				rivets.bind($('#div_rivets'), {eNota: eNota});

				// CSS PRA DAR UMA MELHORADA NA APARÊNCIA.
				//$(".nota").css("margin-left", "20px").css("margin-top", "10px").css("margin-bottom", "10px").css("width", "30%").css("display", "inline-block");
				//$("h4, i").css("margin-left", "10px").css("margin-right", "10px");
				//$(".div_edit, .div_delete").css("display", "inline-block").css("margin-bottom", "10px");
				$("#cabecalho_enota"+value.id+" h4").css("display", "inline-block");
				$("#date"+value.id).css("float", "right");
				$("#title"+value.id).css("font-size", "25px");
				$("#text"+value.id).css("font-size", "20px");
				//$("h4").css("font-family", "Comic Sans MS", "Comic Sans", "cursive");

				// COLORE ALEATORIAMENTE O FUNDO DAS NOTAS.
				var rand = Math.floor((Math.random() * 4) + 1);
				if(rand==1){
					$('#'+value.id).css("background", "#7EFD7C"); // VERDE.
					$("#cabecalho_enota"+value.id).css("background", "#2CD029");
				}
				else if (rand==2){
					$('#'+value.id).css("background", "#FFC0CB"); // ROSA
					$("#cabecalho_enota"+value.id).css("background", "#E38BDD");
				}
				else if(rand==3){
					$('#'+value.id).css("background", "#B0E0E6"); // AZUL.
					$("#cabecalho_enota"+value.id).css("background", "#56ABE0");
				}
				else if(rand==4){
					$('#'+value.id).css("background", "#faf754"); // AMARELO.
					$("#cabecalho_enota"+value.id).css("background", "#D0CB29");
				}

				// PARA ORDENAR DE ACORDO COM O id.
				var divList = $(".nota");
				divList.sort(function(a, b) {
				    return $(a).attr("id") - $(b).attr("id")
				});
				$("#div_notas").html(divList);
			});

			// BOTÃO DE DELETAR.
			$('.div_delete i').click(function(){
				$.ajax({
					url: 'http://localhost:8080/eNotas/delete/'+$(this).attr("id"),
					dataType: 'json',
					type: 'DELETE',
					success: function(){
						recarregar();
					}
				});
				function recarregar(){location.reload();}
			});

			// BOTÃO DE EDITAR.
			$('.div_edit i').click(function(){
				// VALOR UTILIZADO PARA ENVIAR O id PARA O BACK-END.
				id_edit=$(this).attr("id");
			});
		}
	});
});
