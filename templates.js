var template = {};

template.invalidFields = function(fields) {
  var out = [];
  for (var i=0;i<fields.length;i++){
    out.push(fields[i]);
  }
  return out.join('\", \"');
};

