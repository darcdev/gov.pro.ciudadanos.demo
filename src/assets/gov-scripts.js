

function QuitarArchivo(){
	 $("#archivoTitulo").val("");
	 $(".upload-file").show();
     $(".archivo-cargado").hide();
}


$(function() {
	$(".archivo-cargado").hide();
    $("#archivoTitulo").change(function (){
    	
    	
      var fileName = $(this).val().split('\\').pop()+" (" +this.files[0].size+" Bytes)";      
      
      $(".upload-file").hide();
      $("#texto-upload").html(fileName);
      $(".archivo-cargado").show();
    });
 });





function anteriorPagina() {
	var tabla = $('#tabla').DataTable();
	tabla.page('previous').draw('page');
	actualizarPaginas();
}

function siguientePagina() {
	var tabla = $('#tabla').DataTable();
	tabla.page('next').draw('page');
	actualizarPaginas();
}

function actualizarPaginas() {
	var tabla = $('#tabla').DataTable();
	var info = tabla.page.info();
	var size = tabla.page.len();

	size = size * (info.page + 1);
	if ((info.page + 1) == info.pages) {
		size = info.recordsTotal;
	}



	$('#tableInfo').html(
		'' + size + ' de ' + info.recordsTotal + ' resultados'
		);


}

$(document)
.ready(
	function() {
		var tabla_codigos = $('#tabla')
		.DataTable(
		{
			initComplete: function () {
				var col = 0;
				this.api().columns().every( function () {
					col++;
					var column = this;
					var select = $('<select class="custom-select" id="search-col-'+col+'" title="Seleccione"><option value="">Todas</option></select>')
					.appendTo( $(column.footer()).empty() )
					.on( 'change', function () {
						var val = $.fn.dataTable.util.escapeRegex(
							$(this).val()
							);

						column
						.search( val ? '^'+val+'$' : '', true, false )
						.draw();
					} );

					column.data().unique().sort().each( function ( d, j ) {
						select.append( '<option value="'+d+'">'+d+'</option>' )
					} );
				} );
			},
			"drawCallback" : function(settings) {
				actualizarPaginas();
				$(
					"#tabla_filter, #tabla_info,#tabla_first,#tabla_last")
				.css("display", "none");
			},
			"sPaginationType" : "full_numbers",
			"oLanguage" : {
				"sLengthMenu" : " _MENU_",
				"sZeroRecords" : "No se encontraron registros.",
				"sInfo" : "Mostrando _START_ a _END_ de _TOTAL_ registros",
				"sInfoEmpty" : "Mostrando 0 a 0 de 0 registros",
				"sInfoFiltered" : "(Filtrado de _MAX_ total registros)",
				"sSearch" : "Filtrar:",
				"oPaginate" : {
					"sFirst" : "Primero",
					"sPrevious" : "Anterior",
					"sNext" : "Siguiente",
					"sLast" : "&Uacute;ltimo"
				},
				"aoColumnDefs" : [ {
					'bSortable' : true,
					'aTargets' : [ 1 ]
				} ]
			}
		});

		/**/
		$('#search_tipo_documento').on('keyup', function() {
			tabla_codigos.columns(3).search(this.value).draw();
		});
		$("#search-tabla-length").append($("#tabla_length"));

		$("#container-search-col-3").append($("#search-col-3"));
		$("#container-search-col-4").append($("#search-col-4"));
		$("#paginacion-tabla").append($("#tabla_paginate"));

		$("select").selectpicker();
		$("#search-col-1,#search-col-2,#search-col-5").parent()
		.css("display", "none");

		$("#tabla_filter, #tabla_info,#tabla_first,#tabla_last")
		.css("display", "none");

	})