module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
      development: {
        files: {
          "dev/styles/main.css": "src/styles/main.less", // main.css é o arquivo de destino, que será criado e inserido na pasta de desenvolvimento (dev). main.less é o arquivo de origem, que está na pasta src (tanto a pasta quanto o arquivo foram[e precisam ter sido] criados anteriormente)
        },
      },
      production: {
        options: {
          compress: true,
        },
        files: {
          "dist/styles/main.min.css": "src/styles/main.less", // main.min.css é o arquivo de destino, que será criado e inserido na pasta de distribuição (dist). main.less é o arquivo de origem, que está na pasta src (tanto a pasta quanto o arquivo foram [e precisam ter sido] criados anteriormente)
        },
      },
    },
    watch: {
      less: {
        files: ["src/styles/**/*.less"], // Arquivos a serem monitorados. Aqui estamos incluindo qualquer arquivo Less (*.less) que esteja dentro de qualquer pasta (**) dentro da pasta styles, a qual está dentro da pasta src
        tasks: ["less:development"], // Tarefa a ser executada (less:development, criada acima) quando houver qualquer modificação nos arquivos definidos em "files" (linha acima). Neste caso, a tarefa less:development (compilação do Less) será executada quando houverem modificações em qualquer arquivo de extensão .less em qualquer pasta dentro da pasta styles, a qual está dentro da pasta src
      },
      html: {
        files: ["src/index.html"], // Arquivos a serem monitorados. Neste caso estamos observando qualquer mudança no documento index.html localizado na pasta src, atualizando-o automaticamente
        tasks: ["replace:dev"], // Tarefa a ser executada. Neste caso, é a tarefa replace no ambiente de desenvolvimento, criada abaixo (veja os detalhes abaixo)
      },
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "ENDERECO_DO_CSS", // Padrão a ser substituído
              replacement: "./styles/main.css", // Substituição a ser feita (caminho para o arquivo CSS)
            },
            {
              match: "ENDERECO_DO_JS", // Padrão a ser substituído
              replacement: "../src/scripts/main.js", // Substituição a ser feita (caminho para o arquivo JS)
            },
          ],
        },
        files: [
          // Configurações de arquivo
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"], // Arquivo a ser analisado
            dest: "dev/", // Pasta onde o novo arquivo contendo as substituições será inserido. Nesse caso, estamos no ambiente de desenvolvimento, então a pasta deve ser a "dev"
          },
        ],
      },
      dist: {
        options: {
          patterns: [
            {
              match: "ENDERECO_DO_CSS",
              replacement: "./styles/main.min.css", // Para a distribuição (site público), queremos o arquivo CSS minificado
            },
            {
              match: "ENDERECO_DO_JS", // Padrão a ser substituído
              replacement: "./scripts/main.min.js", // Substituição a ser feita (caminho para o arquivo JS)
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["prebuild/index.html"], // Para a distribuição (site público), queremos o arquivo HTML minificado, o qual se encontra na pasta prebuild, criada após a minificação do arquivo HTML com o plugin htmlmin
            dest: "dist/", // A pasta de destino deve ser a "dist", pois agora o ambiente é o de distribuição (dist), e não de desenvolvimento (dev)
          },
        ],
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true, // Removerá qualquer comentário do arquivo HTML
          collapseWhitespace: true, // Removerá todos os espaços em branco
        },
        files: {
          "prebuild/index.html": "src/index.html", // Pasta temporária e arquivo alvo que serão criados e arquivo de origem, respectivamente
        },
      },
    },
    clean: ["prebuild"], // Pasta que queremos deletar
    uglify: {
      target: {
        files: {
          "dist/scripts/main.min.js": "src/scripts/main.js",
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-less"); // Incluindo o plugin Less
  grunt.loadNpmTasks("grunt-contrib-watch"); // Incluindo o plugin Watch
  grunt.loadNpmTasks("grunt-replace"); // Incluindo o plugin Replace
  grunt.loadNpmTasks("grunt-contrib-htmlmin"); // Incluindo o plugin HTML Min
  grunt.loadNpmTasks("grunt-contrib-clean"); // Incluindo o plugin Clean
  grunt.loadNpmTasks("grunt-contrib-uglify"); // Incluindo o plugin Uglify

  grunt.registerTask("default", ["watch"]); // Tarefa padrão, a qual é executada no ambiente de desenvolvimento. Veja o objeto watch acima e perceba que a tarefa a ser executada quando o watch for chamado pelo comando npm run grunt é a de compilação do Less [transformação de arquivos .less em arquivos .css, numa espécie de tradução]).
  grunt.registerTask("build", [
    // Tarefas a serem executadas em ambiente de distribuição
    "less:production", // Compilação do Less
    "htmlmin:dist", // Minificação do HTML
    "replace:dist", // Substituição de padrões
    "clean", // Removendo a pasta temporária (prebuild)
    "uglify", // Compressão do arquivo JavaScript
  ]);
};
