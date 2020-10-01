const [values, setValues] = useState({
    name: '',
    rank: '',
    available: false,
    lng: '',
    lat: '',
    error: '',
    addedNinja: '',
    formData: ''
  })  


  const {
    name,
    rank,
    available,
    lng,
    lat,
    error,
    addedNinja,
    formData
  } = values

  <div className='form-group'>
  <label className='text-muted'>Category</label>
  <select className='form-control'
      onChange={handleChange('category')}
      type='text'
  >
      <option>Select Category</option>
      {categories &&
      categories.map((category, i) => (
          <option key={i} value={category._id}>
          {category.name}
          </option>
      ))}
  </select>
  </div>