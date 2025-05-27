import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export interface DeepSeekResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
      reasoning_content?: string;
      tool_calls?: {
        id: string;
        type: string;
        function: {
          name: string;
          arguments: string;
        };
      }[];
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  created: number;
  model: string;
  object: string;
}

export interface GeneratedName {
  chinese: string;
  pinyin: string;
  meaning: string;
  reason: string;
}

export async function generateChineseNames(
  name: string,
  description?: string
): Promise<GeneratedName[]> {
  try {
    const prompt = `You are a Chinese naming expert. Generate 3 meaningful Chinese names for a person named "${name}"${
      description ? ` who describes themselves as: "${description}"` : ''
    }.

For each name, provide:
1. The Chinese characters (2-3 characters)
2. The pinyin with tones (e.g., Ài Lè Xuān)
3. The meaning in English
4. A detailed explanation of why this name was chosen

Requirements:
- Names should have 2-3 characters
- First character should sound similar to the first syllable of their original name
- Include characters with positive meanings
- Consider their personality/description if provided
- Explain the meaning of each character and how it relates to the person

Please format your response as a valid JSON array with objects containing these exact fields: "chinese", "pinyin", "meaning", and "reason".

Example format:
[
  {
    "chinese": "艾乐轩",
    "pinyin": "Ài Lè Xuān",
    "meaning": "Joyful Adventurer",
    "reason": "艾(Ài) sounds like your name and means love. 乐(Lè) represents joy and optimism. 轩(Xuān) suggests elegance and adventure."
  }
]`;

    const response = await axios.post<DeepSeekResponse>(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: false,
        max_tokens: 8192,
        enable_thinking: true,
        thinking_budget: 32768,
        min_p: 0.05,
        stop: [],
        temperature: 0.6,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
        n: 1,
        response_format: {
          type: 'text',
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Extract JSON from the response content
    let jsonContent = content;
    
    // Try to find JSON array in the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonContent = jsonMatch[0];
    }
    
    try {
      const names: GeneratedName[] = JSON.parse(jsonContent);
      return names;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', content);
      // Fallback: try to extract names manually or return default names
      return [
        {
          chinese: "待生成",
          pinyin: "Dài Shēng Chéng",
          meaning: "To Be Generated",
          reason: "The AI response could not be parsed. Please try again."
        }
      ];
    }

  } catch (error) {
    console.error('Error generating names:', error);
    throw new Error('Failed to generate Chinese names');
  }
} 