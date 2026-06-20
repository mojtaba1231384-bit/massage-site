/** @type {import('@vercel/node').VercelConfig} */
export default {
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