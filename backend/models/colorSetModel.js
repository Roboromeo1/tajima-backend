import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rgb: {
        r: { type: Number, required: true },
        g: { type: Number, required: true },
        b: { type: Number, required: true },
    }
});

const colorSetSchema = mongoose.Schema({
  name: { type: String, required: false, unique: true },
  colors: [colorSchema], // use the colorSchema defined above
});

const ColorSet = mongoose.model('ColorSet', colorSetSchema);

export default ColorSet;
