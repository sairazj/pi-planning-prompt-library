/**
 * Stream a response to the GitHub Copilot Extension SSE endpoint.
 *
 * Calls the GitHub Copilot API (which proxies to the underlying LLM) using
 * the token passed in the X-GitHub-Token header, then streams the response
 * back to the client using the Copilot SSE format.
 */

/**
 * @param {string} systemPrompt - The ceremony-specific system prompt
 * @param {string} userContent  - The user's message / arguments
 * @param {Array}  history      - Previous messages in the conversation
 * @param {object} res          - Express response (SSE stream)
 */
async function streamResponse(systemPrompt, userContent, history, res) {
  // The GitHub Copilot API endpoint for extensions
  const COPILOT_API = 'https://api.githubcopilot.com/chat/completions';

  // Build the message list: system prompt + conversation history + new user message
  const messages = [
    { role: 'system', content: systemPrompt },
    // Include prior conversation context (skip the first system message if present)
    ...history.filter((m) => m.role !== 'system').slice(-10),
    { role: 'user', content: userContent },
  ];

  try {
    const response = await fetch(COPILOT_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${res.req.headers['x-github-token']}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        stream: true,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Copilot API error ${response.status}: ${error}`);
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Pipe the streamed response back to the client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // Forward each SSE chunk as-is
      res.write(chunk);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Stream error:', err);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}

module.exports = { streamResponse };
