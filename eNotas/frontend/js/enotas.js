$(document).ready(function(){

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

			// DATA BINDING PARA MOSTRAR OS DADOS NA TELA.
			window.view = rivets.bind($('.enota'),{
		        enotas:data
	   		});
/*
	   		// COLORIR AS E-NOTAS.
			$(".enota").each(function(index){
				var rand = Math.floor((Math.random() * 4) + 1);
				if(rand==1){
					$(".enota").css("background", "#7EFD7C"); // VERDE.
					$(".enota #cabecalho").css("background", "#2CD029");
				}
				else if (rand==2){
					$(".enota").css("background", "#FFC0CB"); // ROSA
					$(".enota #cabecalho").css("background", "#E38BDD");
				}
				else if(rand==3){
					$(".enota").css("background", "#B0E0E6"); // AZUL.
					$(".enota #cabecalho").css("background", "#56ABE0");
				}
				else if(rand==4){
					$(".enota").css("background", "#faf754"); // AMARELO.
					$(".enota #cabecalho").css("background", "#D0CB29");
				}
			});
*/
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
