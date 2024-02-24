/**
 * 
 * @class TextUtils
 * @classdesc colection of text utils functions 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class TextUtils {
  public static sanitize(s: string): string {
    try {
      return s.replace(/\s/g, "").toLowerCase();
    } catch {
      return ''
    }
  }
}
