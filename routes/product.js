const express = require('express');

var router = express.Router();


router.get('/', function(req, res) {
   const product = require('./../data/product.json');
    res.json(product);
    console.log(product);
});

router.get('/:id',function(req,res){
    const product = require ('./../data/product.json')
    
    res.json(product[req.params.id]);
});
router.get('/:id/:qt', (req, res) => {
    const product = require ('./../data/product.json')

	const id = req.params.id; 
	const qt = parseInt(req.params.qt); 
	const pro = product[id]; 

	if (!pro) {
		res.status(404).send('Produit non trouvé'); // si l'ID du produit est introuvable, renvoie un code d'erreur 404
	} else {
		const total = pro.price * qt; // calcule le prix total pour la quantité donnée
		res.send(`Le prix total pour ${qt} ${pro.name}(s) est ${total}$`); // renvoie la réponse avec le prix total
	}
});
router.get('/instock/:qt',function(req,res){
    const product = require('./../data/product.json');

    const qt = parseInt(req.params.qt);
	const instock = {}; 

	
	Object.keys(product).forEach((key) => {
		if (product[key].stock >= qt) {
			instock[key] = product[key];
		}
	});

	res.json(instock);
});

module.exports  = router ;