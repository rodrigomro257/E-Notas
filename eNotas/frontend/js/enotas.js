$(document).ready(function(){

	// ARMAZENA O id A SER ENVIADO PARA O BACK-END.
	var id_edit;

	// PARA LIMPAR OS CAMPOS DE EDIÇÃO.
	$(".create_nota").val("");
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
		}
	});

	// BINDER DO BOTÃO DE EDITAR.
	rivets.binders['edit'] = function(el, value){
		el.onclick = function(){
			id_edit=value; // VALOR UTILIZADO PARA ENVIAR O id PARA O BACK-END.
		}
	}

	// BINDER DO BOTÃO DE EXCLUIR.
	rivets.binders['delete'] = function(el, value){
		el.onclick = function(){
			$.ajax({
				url: 'http://localhost:8080/eNotas/delete/'+value,
				dataType: 'json',
				type: 'DELETE',
				success: function(){
					recarregar();
				}
			});
			function recarregar(){location.reload();}
		}
	}

	// BOTÃO NA MODEL DE CONFIRMAR A CRIAÇÃO DE UMA NOVA E-NOTA.
	$('.btn_create').click(function(){
		$.ajax({
			url: 'http://localhost:8080/eNotas',
			dataType: 'json',
			contentType: "application/json",
			type: "POST",
			data: JSON.stringify({"titulo":$("#title_text_create").val(),
								  "texto":$("#text_text_create").val(),
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
	  							  "titulo":$("#title_text_edit").val(),
								  "texto":$("#text_text_edit").val(),
								  "data":$("#date_text_edit").val()}),
			success: function(){
					recarregar();
				}
		});
		function recarregar(){location.reload();}
	});
	
	// SELECIONAR DATA PELO CALENDÁRIO.
	$(function(){
		$("#date_text_create").datepicker({
			showButtonPanel:true,
			dateFormat: 'yy-mm-dd'
		});
	});
	$(function(){
		$("#date_text_edit").datepicker({
			showButtonPanel:true,
			dateFormat: 'yy-mm-dd'
		});
	});

	// FORMATA A DATA. ELA VEM DO BANCO DE DADOS COMO UM NÚMERO TIMESTAMP.
	rivets.formatters.date = function(value){
		return moment(value).format('DD MMM YYYY'); 
	}
});
