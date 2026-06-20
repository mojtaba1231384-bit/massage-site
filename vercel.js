/** @type {import('@vercel/node').VercelConfig} */
module.exports = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  regions: ['iad1'],
  functions: {
    'api/**/*.js': {
      maxDuration: 10
    }
  }
};