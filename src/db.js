/**
 * Created by roexber on 23/06/14.
 */
var mongoose = require('mongoose'),
	externalService = require('./externalServices');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
	_id: String,
	model_name: String,
	model_description: String

});

ModelSchema.set('_id', false);
mongoose.model('getModel', ModelSchema, 'Model');

var mongoUri = externalService.mongoUrl;

mongoose.connect(mongoUri);
