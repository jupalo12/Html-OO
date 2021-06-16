class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;

    }

    salvar() {
        let produto = this.lerDados();
        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId,produto);
            }

        }
        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ' ';
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_açoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].NomeProduto;
            td_valor.innerText = this.arrayProdutos[i].PreçoProduto;

            td_id.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar-script.svg';
            imgEdit.setAttribute("onclick", "produto.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")")

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/eletar-conta.svg';
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")")

            td_açoes.appendChild(imgEdit);
            td_açoes.appendChild(imgDelete);
            console.log(this.arrayProdutos)
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].NomeProduto = produto.NomeProduto
                this.arrayProdutos[i].PreçoProduto = produto.PreçoProduto
            }
        }
    }

    editar(dados) {
        this.editId = dados.id;


        document.getElementById('produto').value = dados.NomeProduto;
        document.getElementById('preço').value = dados.PreçoProduto;

        document.getElementById('btn1').innerText = 'Atualizar'
    }

    validaCampos(produto) {
        let msg = ``
        if (produto.NomeProduto == ``) {
            msg += `- Informe o nome do produto \n`
        }
        if (produto.PreçoProduto == ``) {
            msg += `- Informe o preço do produto \n`
        }
        if (msg != ``) {
            alert(msg);
            return false
        }
        return true
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.NomeProduto = document.getElementById('produto').value;
        produto.PreçoProduto = document.getElementById('preço').value;

        return produto;
    }

    cancelar() {
        document.getElementById('produto').value = ' ';
        document.getElementById('preço').value = ' ';

    }

    deletar(id) {

        if (confirm('Deseja Relmente Delete Este Produto?' + id)) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i);
                }
            }

            console.log(this.arrayProdutos)
        }
    }



}

var produto = new Produto;