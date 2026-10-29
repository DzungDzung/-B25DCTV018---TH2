export function validateField(name, value) {
  value = String(value).trim();
  switch (name) {
    case 'title':
      return value.length < 3 ? 'Tên sách phải có ít nhất 3 ký tự' : '';
    case 'author':
      return value ? '' : 'Tác giả là bắt buộc';
    case 'genre':
      return value ? '' : 'Vui lòng chọn thể loại';
    case 'year': {
      const y = Number(value);
      const max = new Date().getFullYear();
      return value && Number.isInteger(y) && y >= 1900 && y <= max
        ? ''
        : `Năm phải từ 1900 đến ${max}`;
    }
    default:
      return '';
  }
}
