#!/usr/bin/env python3
"""
生成简单的音效文件
需要安装：pip install numpy scipy
"""

import numpy as np
from scipy.io.wavfile import write
import os

SAMPLE_RATE = 44100

def generate_click_sound():
    """生成点击音效（短促的"滴"声）"""
    duration = 0.1  # 100ms
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration))
    
    # 高频正弦波 + 衰减
    freq = 800
    envelope = np.exp(-t * 30)
    sound = np.sin(2 * np.pi * freq * t) * envelope
    
    # 归一化
    sound = sound / np.max(np.abs(sound)) * 0.5
    
    # 转换为 16 位整数
    sound_int = (sound * 32767).astype(np.int16)
    
    return sound_int

def generate_enter_sound():
    """生成进入音效（梦幻的和弦）"""
    duration = 2.0  # 2 秒
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration))
    
    # 和弦频率 (C major: C4, E4, G4)
    frequencies = [261.63, 329.63, 392.00]
    
    sound = np.zeros_like(t)
    for freq in frequencies:
        # 每个音符有不同的起音和衰减
        envelope = np.exp(-t * (1 + freq/1000))
        sound += np.sin(2 * np.pi * freq * t) * envelope
    
    # 添加一些泛音
    for freq in [523.25, 659.25]:  # C5, E5
        envelope = np.exp(-t * 2)
        sound += np.sin(2 * np.pi * freq * t) * envelope * 0.3
    
    # 归一化
    sound = sound / np.max(np.abs(sound)) * 0.4
    
    # 转换为 16 位整数
    sound_int = (sound * 32767).astype(np.int16)
    
    return sound_int

def generate_ambient_sound():
    """生成背景环境音（轻柔的氛围音）"""
    duration = 10.0  # 10 秒，可以循环播放
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration))
    
    # 低频氛围
    frequencies = [55, 110, 164.81]  # A1, A2, E3
    
    sound = np.zeros_like(t)
    for freq in frequencies:
        # 缓慢的 LFO 调制
        lfo = np.sin(2 * np.pi * 0.5 * t) * 0.3 + 0.7
        envelope = np.exp(-t * 0.1) * lfo
        sound += np.sin(2 * np.pi * freq * t) * envelope
    
    # 添加一些高音泛音
    for freq in [220, 330]:
        envelope = np.exp(-t * 0.2) * 0.2
        sound += np.sin(2 * np.pi * freq * t) * envelope
    
    # 归一化
    sound = sound / np.max(np.abs(sound)) * 0.3
    
    # 转换为 16 位整数
    sound_int = (sound * 32767).astype(np.int16)
    
    return sound_int

if __name__ == '__main__':
    output_dir = '../assets/sounds'
    os.makedirs(output_dir, exist_ok=True)
    
    print("生成音效文件...")
    
    # 生成点击音效
    click = generate_click_sound()
    write(f'{output_dir}/click.wav', SAMPLE_RATE, click)
    print(f"✓ click.wav (点击音效)")
    
    # 生成进入音效
    enter = generate_enter_sound()
    write(f'{output_dir}/enter.wav', SAMPLE_RATE, enter)
    print(f"✓ enter.wav (进入音效)")
    
    # 生成环境音
    ambient = generate_ambient_sound()
    write(f'{output_dir}/ambient.wav', SAMPLE_RATE, ambient)
    print(f"✓ ambient.wav (环境音)")
    
    print("\n音效生成完成！")
