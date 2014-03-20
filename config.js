module.exports = [
  {
    name: 'prepare_scripts',
    label: 'Prepare scripts (one per line)',
    type: 'text',
    required: false
  },
  {
    name: 'test_scripts',
    label: 'Test scripts (one per line)',
    type: 'text',
    required: true
  },
  {
    name: 'expect_tap',
    label: 'Expect TAP output',
    type: 'checkbox'
  }
];
